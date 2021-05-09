import supertest, { SuperTest, Test } from 'supertest';
import axios from 'axios';
import admin from '../../../src/routes/v1/auth/firebase';
import dbHandler from '../../db-handler';
import app from '../../../src/app';
import { isChoicePresentInPollChoices, encrypt } from '../../../src/helpers';
import Poll, { RocketMeetPoll } from '../../../src/db/models/poll';
import { webAPIKey } from '../../../src/config';

const request: SuperTest<Test> = supertest(app);

const pollsterEmailID = 'pollster@test.com';
const encryptedPollsterEmailID = encrypt(pollsterEmailID);

const testPoll = {
  title: 'testPoll',
  type: 'protected',
  encryptedEmailID: encryptedPollsterEmailID,
  choices: [
    { start: 1633577400000, end: 1633581000000 },
    { start: 1633588200000, end: 1633591800000 },
    { start: 1633667400000, end: 1633671000000 },
    { start: 1633671000000, end: 1633674600000 },
  ],
};

let pollID: string;

const createTestPoll = async () => {
  const createdPoll = await Poll.create(testPoll);
  pollID = createdPoll._id;
};

const voterEmailID = 'voter@test.com';

// Connect to a new in-memory database before running any tests and create mock firebase user

beforeAll(async () => {
  dbHandler.connect();
  await admin.auth().createUser({
    email: voterEmailID,
    displayName: 'dbowie',
    emailVerified: false,
  });
});

// Seed the db

beforeEach(async () => createTestPoll());

// Clear all test data after every test

afterEach(async () => dbHandler.clearDatabase());

// Delete the mock user and close the db

afterAll(async () => {
  dbHandler.closeDatabase();
  const USER = await admin.auth().getUserByEmail(voterEmailID);
  const uid = USER.uid;
  await admin.auth().deleteUser(uid);
  return admin.app().delete();
});

// to generate token

const url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithCustomToken?key=${webAPIKey}`;

// Tests

describe('get poll', () => {
    it('Should return poll by poll _id', async (done) => {
      const getPollRes = await request.get(`/v1/poll/${pollID}`);
      expect(getPollRes.body.title).toEqual('testPoll');

      done();
    });
});

describe('vote on poll', () => {
  it('Should allow logged-in voters to mark on a poll', async (done) => {
    const USER = await admin.auth().getUserByEmail(voterEmailID);
    const uid = USER.uid;
    const CTOKEN = await admin.auth().createCustomToken(uid);
    const tokenRes = await axios({
      method: 'post',
      url,
      data: {
        token: CTOKEN,
        returnSecureToken: true,
      },
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const TOKEN = await tokenRes.data.idToken;
    const voterOneVotesRes = await request
      .put(`/v1/poll/protected/${pollID}`)
      .send({
        name: 'dbowie',
        choices: [{ start: 1633667400000, end: 1633671000000 }],
      })
      .set({ Authorization: `Bearer ${TOKEN}` });
    expect(isChoicePresentInPollChoices(
      { start: 1633667400000, end: 1633671000000 },
      voterOneVotesRes.body.votes[0].choices,
    )).toEqual(true);

    const getPollFirstTime: RocketMeetPoll | null = await Poll.findOne({ _id: pollID }).lean();

    expect(isChoicePresentInPollChoices(
      { start: 1633667400000, end: 1633671000000 },
      getPollFirstTime!.votes![0].choices,
    )).toEqual(true);

    done();
  });

  it('Should not allow anonymous voters to mark on a poll', async (done) => {
    const voterOneVotesRes = await request
      .put(`/v1/poll/protected/${pollID}`)
      .send({
        name: 'anonymous',
        choices: [{ start: 1633667405000, end: 1633671005000 }],
      });

    expect(voterOneVotesRes.body.msg).toEqual('Token does not exist');

    done();
  });

  it('Should not allow a logged-in voter to act as an imposter', async (done) => {
    const USER = await admin.auth().getUserByEmail(voterEmailID);
    const uid = USER.uid;
    const CTOKEN = await admin.auth().createCustomToken(uid);
    const tokenRes = await axios({
      method: 'post',
      url,
      data: {
        token: CTOKEN,
        returnSecureToken: true,
      },
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const TOKEN = await tokenRes.data.idToken;
    const voterOneVotesRes = await request
      .put(`/v1/poll/protected/${pollID}`)
      .send({
        name: 'markwatney',
        choices: [{ start: 1633667400000, end: 1633671000000 }],
      })
      .set({ Authorization: `Bearer ${TOKEN}` });

    expect(voterOneVotesRes.body.msg).toEqual('Forbidden');

    done();
  });
});
