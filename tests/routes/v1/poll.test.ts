import supertest, { SuperTest, Test } from 'supertest';
import dbHandler from '../../db-handler';
import app from '../../../src/app';
import isChoicePresentInPollChoices from '../../../src/helpers';
import Poll, { RocketMeetPoll } from '../../../src/db/models/poll';

const request: SuperTest<Test> = supertest(app);

const testPoll = {
  title: 'testPoll',
  emailID: 'encryptedEmailID',
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

// Connect to a new in-memory database before running any tests

beforeAll(async () => dbHandler.connect());

// Seed the db

beforeEach(async () => createTestPoll());

// Clear all test data after every test

afterEach(async () => dbHandler.clearDatabase());

// Remove and close the db and server.

afterAll(async () => dbHandler.closeDatabase());

// Tests

describe('get poll', () => {
    it('Should return poll by poll _id', async (done) => {
      const getPollRes = await request.get(`/v1/poll/${pollID}`);
      expect(getPollRes.body.title).toEqual('testPoll');

      done();
    });

    it('Should return null if poll does not exist', async (done) => {
      const someIdWhichDoesntExist = '5fe141353477a0591da0c98a';
      const getPollRes = await request.get(`/v1/poll/${someIdWhichDoesntExist}`);

      expect(getPollRes.body).toEqual(null);
      done();
    });
});

describe('vote on poll', () => {
  it('Should allow users to mark on a poll', async (done) => {
    const voterOneVotesRes = await request.put(`/v1/poll/${pollID}`).send({
      name: 'dbowie',
      choices: [{ start: 1633667400000, end: 1633671000000 }],
    });
    expect(isChoicePresentInPollChoices(
      { start: 1633667400000, end: 1633671000000 },
      voterOneVotesRes.body.votes[0].choices,
    )).toEqual(true);

    const getPollFirstTime: RocketMeetPoll | null = await Poll.findOne({ _id: pollID }).lean();
    expect(isChoicePresentInPollChoices(
      { start: 1633667400000, end: 1633671000000 },
      getPollFirstTime!.votes![0].choices,
    )).toEqual(true);

    const voterTwoVotesRes = await request.put(`/v1/poll/${pollID}`).send({
      name: 'elon',
      choices: [{ start: 1633671000000, end: 1633674600000 }],
    });
    expect(isChoicePresentInPollChoices(
      { start: 1633671000000, end: 1633674600000 },
      voterTwoVotesRes.body.votes[1].choices,
    )).toEqual(true);

    const getPollSecondTime: RocketMeetPoll | null = await Poll.findOne({ _id: pollID }).lean();
    expect(isChoicePresentInPollChoices(
      { start: 1633671000000, end: 1633674600000 },
      getPollSecondTime!.votes![1].choices,
    )).toEqual(true);

    done();
  });

  it('Should not allow users to vote on a closed poll', async (done) => {
    const closedPoll = await Poll.create({
      title: 'testPoll',
      emailID: 'encryptedEmailID',
      choices: [
        { start: 1633667400000, end: 1633671000000 },
        { start: 1633671000000, end: 1633674600000 },
      ],
      finalChoice: { start: 1633671000000, end: 1633674600000 },
      open: false,
    });

    const voterOneVotesRes = await request.put(`/v1/poll/${closedPoll._id}`).send({
      name: 'dbowie',
      choices: [{ start: 1633671000000, end: 1633674600000 }],
    });
    expect(voterOneVotesRes.body.message).toEqual('Poll closed');
    done();
  });

  it('Should not allow invalid slot choices', async (done) => {
    const voterOneVotesRes = await request.put(`/v1/poll/${pollID}`).send({
      name: 'dbowie',
      choices: [{ start: 1633671000042, end: 1633674600042 }],
    });
    expect(voterOneVotesRes.body.message).toEqual('Invalid choices');
    done();
  });
});
