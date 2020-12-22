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

describe('create poll', () => {
    it('Should save poll to db', async (done) => {
      const res = await request.post('/v1/user/poll').send({
        pollName: 'OccupyMars',
        userID: 'elon',
        interval: 96,
        choices: [4, 2, 7],
      });
      expect(res.body.pollName).toEqual('OccupyMars');
      expect(res.body.userID).toEqual('elon');
      expect(res.body.interval).toEqual(96);
      expect(res.body.choices).toEqual([4, 2, 7]);

      const poll: PollProps | null = await Poll.findOne({ _id: res.body._id }).lean();
      expect(poll!.interval).toEqual(96);
      done();
    });

    it('Should allow poll to be edited', async (done) => {
      const editPollRes = await request.put(`/v1/user/poll/${pollID}`).send({
        interval: 20,
        choices: [1, 7],
      });
      expect(editPollRes.body.interval).toEqual(20);
      expect(editPollRes.body.choices).toEqual([1, 7]);

      const getPollFirstTime: PollProps | null = await Poll.findOne({ _id: pollID }).lean();
      expect(getPollFirstTime!.interval).toEqual(20);
      expect(getPollFirstTime!.choices).toEqual([1, 7]);

      done();
    });
});

describe('get poll', () => {
  it('Should return poll by userID', async (done) => {
    const getPollRes = await request.get(`/v1/user/${testPoll.userID}`);
    expect(getPollRes.body[0].interval).toEqual(42);

    done();
  });

  it('Should return [] if user does not exist', async (done) => {
    const someUserWhichDoesntExist = 'grimes';
    const getPollRes = await request.get(`/v1/poll/user/${someUserWhichDoesntExist}`);

    expect(getPollRes.body.message).toEqual(undefined);
    done();
  });
});

describe('delete poll', () => {
  it('Should delete poll from db', async (done) => {
    const deletePollRes = await request.delete(`/v1/user/poll/${pollID}`);
    expect(deletePollRes.body.pollName).toEqual(testPoll.pollName);

    const getPollFirstTime: PollProps | null = await Poll.findOne({ _id: pollID }).lean();
    expect(getPollFirstTime).toEqual(null);
    done();
  });

  it('Should throw err if there is no poll to delete', async (done) => {
    const someIdWhichDoesntExist = '5fe141353477a0591da0c98a';
    const deletePollRes = await request.delete(`/v1/user/poll/${someIdWhichDoesntExist}`);

    expect(deletePollRes.body.message).toEqual('Poll does not exist');
    done();
  });
});
