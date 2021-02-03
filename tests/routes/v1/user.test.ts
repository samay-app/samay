import supertest, { SuperTest, Test } from 'supertest';
import axios from 'axios';
import admin from '../../../src/routes/v1/auth/firebase';
import dbHandler from '../../db-handler';
import app from '../../../src/app';
import { isChoicePresentInPollChoices, encrypt } from '../../../src/helpers';
import Poll, { RocketMeetPoll } from '../../../src/db/models/poll';
import { webAPIKey } from '../../../src/config';

const emailID = 'test@test.com';
const encryptedEmailID = encrypt(emailID);

const request: SuperTest<Test> = supertest(app);
const testPoll = {
  title: 'testPoll',
  encryptedEmailID,
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

// Connect to a new in-memory database before running any tests and create mock firebase user

beforeAll(async () => {
  dbHandler.connect();
  await admin.auth().createUser({
    email: emailID,
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
  const USER = await admin.auth().getUserByEmail(emailID);
  const uid = USER.uid;
  await admin.auth().deleteUser(uid);
  return admin.app().delete();
});

// to generate token

const url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithCustomToken?key=${webAPIKey}`;

// tests

describe('User authentication', () => {
  it('Should throw err if there is no token in the header', async (done) => {
    const res = await request
      .post('/v1/user/');
    expect(res.body.msg).toEqual('Token does not exist');
    done();
  });
});

describe('create poll', () => {
  it('Should save poll to db', async (done) => {
    const USER = await admin.auth().getUserByEmail(emailID);
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
    const res = await request
      .post('/v1/user/poll')
      .set({ Authorization: `Bearer ${TOKEN}` })
      .send({
        title: 'OccupyMarsMeet',
        encryptedEmailID,
        choices: [
          { start: 1633577400000, end: 1633581000000 },
          { start: 1633588200000, end: 1633591800000 },
        ],
      });
    expect(res.body.title).toEqual('OccupyMarsMeet');
    expect(isChoicePresentInPollChoices(
      { start: 1633577400000, end: 1633581000000 },
      res.body.choices,
    )).toEqual(true);
    expect(isChoicePresentInPollChoices(
      { start: 1633588200000, end: 1633591800000 },
      res.body.choices,
    )).toEqual(true);
    const poll: RocketMeetPoll | null = await Poll.findOne({ _id: res.body._id }).lean();
    expect(poll!.title).toEqual('OccupyMarsMeet');
    expect(isChoicePresentInPollChoices(
      { start: 1633577400000, end: 1633581000000 },
      poll!.choices,
    )).toEqual(true);
    expect(isChoicePresentInPollChoices(
      { start: 1633588200000, end: 1633591800000 },
      poll!.choices,
    )).toEqual(true);
    done();
  });

  it('Should allow poll to be edited', async (done) => {
    const USER = await admin.auth().getUserByEmail(emailID);
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
    const editPollRes = await request
      .put(`/v1/user/poll/${pollID}`)
      .set({ Authorization: `Bearer ${TOKEN}` })
      .send({
        choices: [{ start: 1633671000042, end: 1633674600042 }],
      });
    expect(isChoicePresentInPollChoices(
      { start: 1633671000042, end: 1633674600042 },
      editPollRes.body.choices,
    )).toEqual(true);
    const getPollFirstTime: RocketMeetPoll | null = await Poll.findOne({ _id: pollID }).lean();
    expect(isChoicePresentInPollChoices(
      { start: 1633671000042, end: 1633674600042 },
      getPollFirstTime!.choices,
    )).toEqual(true);
    done();
  });
});

describe('get poll', () => {
  it('Should return poll by emailID', async (done) => {
    const USER = await admin.auth().getUserByEmail(emailID);
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
    const getPollRes = await request
      .get(`/v1/user/${encryptedEmailID}`)
      .set({ Authorization: `Bearer ${TOKEN}` });
    expect(getPollRes.body[0].title).toEqual('testPoll');
    done();
  });

  it('Should return nothing if user does not exist', async (done) => {
    const getPollRes = await request
      .get('/v1/poll/user/haha/haha');
    expect(getPollRes.body.message).toEqual(undefined);
    done();
  });

  it('Should throw err if there is token but wrong encrypted email id', async (done) => {
    const USER = await admin.auth().getUserByEmail(emailID);
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
    const getPollRes = await request
      .get(`/v1/user/${encrypt('invalid-user@test.com')}`)
      .set({ Authorization: `Bearer ${TOKEN}` });
    expect(getPollRes.body.msg).toEqual('Forbidden');
    done();
  });
});

describe('delete poll', () => {
  it('Should delete poll from db', async (done) => {
    const USER = await admin.auth().getUserByEmail(emailID);
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
    const deletePollRes = await request
      .delete(`/v1/user/poll/${pollID}`)
      .set({ Authorization: `Bearer ${TOKEN}` });
    expect(deletePollRes.body.title).toEqual(testPoll.title);
    const getPollFirstTime: RocketMeetPoll | null = await Poll.findOne({ _id: pollID }).lean();
    expect(getPollFirstTime).toEqual(null);
    done();
  });

  it('Should throw err if there is no poll to delete', async (done) => {
    const USER = await admin.auth().getUserByEmail(emailID);
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
    const someIdWhichDoesntExist = '5fe141353477a0591da0c98a';
    const deletePollRes = await request
      .delete(`/v1/user/poll/${someIdWhichDoesntExist}`)
      .set({ Authorization: `Bearer ${TOKEN}` });
    expect(deletePollRes.body.message).toEqual('Poll not found');
    done();
  });
});
