process.env.NODE_ENV = 'test'

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

beforeAll(async () => await dbHandler.connect());

// Clear all test data after every test

afterEach(async () => await dbHandler.clearDatabase());

// Remove and close the db and server.

afterAll(async () => await dbHandler.closeDatabase());

// Tests

describe('create and mark poll', () => {
    it('Should save poll to db', async done => {
      const res = await request.post('/v1/poll').send(testPoll);
      expect(res.body.pollName).toEqual('testPoll');
      expect(res.body.userID).toEqual('starman');
      expect(res.body.interval).toEqual(42);
      expect(res.body.choices).toEqual([4, 6, 8]);

      const poll: PollProps | null = await Poll.findOne({ _id: res.body._id }).lean();
      expect(poll!.interval).toEqual(42);
      done();
    });

    it('Should allow users to mark on a poll', async done => {
      const createTestPollRes = await request.post('/v1/poll').send(testPoll);

      const pollId = createTestPollRes.body._id;
      
      const markFirstTimeRes = await request.put(`/v1/poll/${pollId}`).send({
        userID: 'dbowie',
        choices: [4, 6]
      });
      expect(markFirstTimeRes.body.marked[0].choices).toEqual([4, 6]);

      const getPollFirstTime: PollProps | null = await Poll.findOne({ _id: pollId }).lean()
      expect(getPollFirstTime!.marked![0].choices).toEqual([4, 6]);

      const markSecondTimeRes = await request.put(`/v1/poll/${pollId}`).send({
        userID: 'elon',
        choices: [6, 8]
      });
      expect(markSecondTimeRes.body.marked[1].choices).toEqual([6, 8]);

      const getPollSecondTime: PollProps | null = await Poll.findOne({ _id: pollId }).lean()
      expect(getPollSecondTime!.marked![1].choices).toEqual([6, 8]);

      done();
    });

    it('Should allow a user to mark on a poll and edit any number of times', async done => {
      const createTestPollRes = await request.post('/v1/poll').send(testPoll);

      const pollId = createTestPollRes.body._id;
      
      const markFirstTimeRes = await request.put(`/v1/poll/${pollId}`).send({
        userID: 'dbowie',
        choices: [4, 6]
      });
      expect(markFirstTimeRes.body.marked[0].choices).toEqual([4, 6]);

      const getPollFirstTime: PollProps | null = await Poll.findOne({ _id: pollId }).lean()
      expect(getPollFirstTime!.marked![0].choices).toEqual([4, 6]);

      const markSecondTimeRes = await request.put(`/v1/poll/${pollId}`).send({
        userID: 'dbowie',
        choices: [6, 8]
      });
      expect(markSecondTimeRes.body.marked[0].choices).toEqual([6, 8]);

      const getPollSecondTime: PollProps | null = await Poll.findOne({ _id: pollId }).lean()
      expect(getPollSecondTime!.marked![0].choices).toEqual([6, 8]);

      done();
    });

    it('Should not allow invalid slot choices', async done => {
      const createTestPollRes = await request.post('/v1/poll').send(testPoll);

      const pollId = createTestPollRes.body._id;
      
      const markRes = await request.put(`/v1/poll/${pollId}`).send({
        userID: 'dbowie',
        choices: [1, 9]
      });
      expect(markRes.body.message).toEqual('Invalid choices');
      done();
    });
});
