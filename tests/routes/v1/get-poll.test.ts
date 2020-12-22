import supertest from 'supertest';
import dbHandler from '../../db-handler';
import app from '../../../src/app';

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

describe('get poll', () => {
    it('Should return poll by userID', async (done) => {
      const createTestPollRes = await request.post('/v1/poll').send(testPoll);

      const { userID } = createTestPollRes.body;
      const getPollRes = await request.get(`/v1/poll/user/${userID}`);
      expect(getPollRes.body[0].interval).toEqual(42);

      done();
    });

    it('Should return [] if user does not exist', async (done) => {
      const someUserWhichDoesntExist = 'grimes';
      const getPollRes = await request.get(`/v1/poll/user/${someUserWhichDoesntExist}`);

      expect(getPollRes.body.message).toEqual(undefined);
      done();
    });

    it('Should return poll by poll _id', async (done) => {
      const createTestPollRes = await request.post('/v1/poll').send(testPoll);

      const pollID = createTestPollRes.body._id;
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
