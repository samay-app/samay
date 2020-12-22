import supertest from 'supertest';
import dbHandler from '../../db-handler';
import app from '../../../src/app';
import Poll, { PollProps } from '../../../src/db/models/poll';

const request = supertest(app);

const testPoll = {
  pollName: 'testPoll',
  userID: 'starman',
  interval: 42,
  choices: [4, 6, 8],
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
      expect(getPollRes.body.interval).toEqual(42);

      done();
    });

    it('Should return null if poll does not exist', async (done) => {
      const someIdWhichDoesntExist = '5fe141353477a0591da0c98a';
      const getPollRes = await request.get(`/v1/poll/${someIdWhichDoesntExist}`);

      expect(getPollRes.body).toEqual(null);
      done();
    });
});

describe('mark poll', () => {
  it('Should allow users to mark on a poll', async (done) => {
    const markFirstTimeRes = await request.put(`/v1/poll/${pollID}`).send({
      userID: 'dbowie',
      choices: [4, 6],
    });
    expect(markFirstTimeRes.body.marked[0].choices).toEqual([4, 6]);

    const getPollFirstTime: PollProps | null = await Poll.findOne({ _id: pollID }).lean();
    expect(getPollFirstTime!.marked![0].choices).toEqual([4, 6]);

    const markSecondTimeRes = await request.put(`/v1/poll/${pollID}`).send({
      userID: 'elon',
      choices: [6, 8],
    });
    expect(markSecondTimeRes.body.marked[1].choices).toEqual([6, 8]);

    const getPollSecondTime: PollProps | null = await Poll.findOne({ _id: pollID }).lean();
    expect(getPollSecondTime!.marked![1].choices).toEqual([6, 8]);

    done();
  });

  it('Should allow a user to mark on a poll and edit any number of times', async (done) => {
    const markFirstTimeRes = await request.put(`/v1/poll/${pollID}`).send({
      userID: 'dbowie',
      choices: [4, 6],
    });
    expect(markFirstTimeRes.body.marked[0].choices).toEqual([4, 6]);

    const getPollFirstTime: PollProps | null = await Poll.findOne({ _id: pollID }).lean();
    expect(getPollFirstTime!.marked![0].choices).toEqual([4, 6]);

    const markSecondTimeRes = await request.put(`/v1/poll/${pollID}`).send({
      userID: 'dbowie',
      choices: [6, 8],
    });
    expect(markSecondTimeRes.body.marked[0].choices).toEqual([6, 8]);

    const getPollSecondTime: PollProps | null = await Poll.findOne({ _id: pollID }).lean();
    expect(getPollSecondTime!.marked![0].choices).toEqual([6, 8]);

    done();
  });

  it('Should not allow invalid slot choices', async (done) => {
    const markRes = await request.put(`/v1/poll/${pollID}`).send({
      userID: 'dbowie',
      choices: [1, 9],
    });
    expect(markRes.body.message).toEqual('Invalid choices');
    done();
  });
});
