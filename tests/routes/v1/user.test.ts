import supertest from 'supertest';
import dbHandler from '../../db-handler';
import app from '../../../src/app';
import Poll, { PollProps } from '../../../src/db/models/poll';

const request = supertest(app);

const testPoll = {
  name: 'testPoll',
  userID: 'starman',
  interval: 3600,
  choices: [1700559000, 1700562600, 1700566200],
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
        name: 'OccupyMars',
        userID: 'elon',
        interval: 3600,
        choices: [1703151000, 1703154600, 1703158200],
      });
      expect(res.body.name).toEqual('OccupyMars');
      expect(res.body.userID).toEqual('elon');
      expect(res.body.interval).toEqual(3600);
      expect(res.body.choices).toEqual([1703151000, 1703154600, 1703158200]);

      const poll: PollProps | null = await Poll.findOne({ _id: res.body._id }).lean();
      expect(poll!.interval).toEqual(3600);
      done();
    });

    it('Should allow poll to be edited', async (done) => {
      const editPollRes = await request.put(`/v1/user/poll/${pollID}`).send({
        interval: 3600,
        choices: [1703152800, 1703156400],
      });
      expect(editPollRes.body.interval).toEqual(3600);
      expect(editPollRes.body.choices).toEqual([1703152800, 1703156400]);

      const getPollFirstTime: PollProps | null = await Poll.findOne({ _id: pollID }).lean();
      expect(getPollFirstTime!.interval).toEqual(3600);
      expect(getPollFirstTime!.choices).toEqual([1703152800, 1703156400]);

      done();
    });
});

describe('get poll', () => {
  it('Should return poll by userID', async (done) => {
    const getPollRes = await request.get(`/v1/user/${testPoll.userID}`);
    expect(getPollRes.body[0].interval).toEqual(3600);

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
    expect(deletePollRes.body.name).toEqual(testPoll.name);

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
