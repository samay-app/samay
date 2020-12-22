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

// Connect to a new in-memory database before running any tests

beforeAll(async () => dbHandler.connect());

// Clear all test data after every test

afterEach(async () => dbHandler.clearDatabase());

// Remove and close the db and server.

afterAll(async () => dbHandler.closeDatabase());

// Tests

describe('delete poll', () => {
    it('Should delete poll from db', async (done) => {
      const createTestPollRes = await request.post('/v1/poll').send(testPoll);

      const pollId = createTestPollRes.body._id;

      const deletePollRes = await request.delete(`/v1/poll/${pollId}`);
      expect(deletePollRes.body._id).toEqual(pollId);

      const getPollFirstTime: PollProps | null = await Poll.findOne({ _id: pollId }).lean();
      expect(getPollFirstTime).toEqual(null);
      done();
    });

    it('Sould throw err if there is no poll to delete', async (done) => {
      const someIdWhichDoesntExist = '5fe141353477a0591da0c98a';
      const deletePollRes = await request.delete(`/v1/poll/${someIdWhichDoesntExist}`);

      expect(deletePollRes.body.message).toEqual('Poll does not exist');
      done();
    });
});
