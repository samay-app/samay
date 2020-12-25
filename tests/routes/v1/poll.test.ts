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

describe('get poll', () => {
    it('Should return poll by poll _id', async (done) => {
      const getPollRes = await request.get(`/v1/poll/${pollID}`);
      expect(getPollRes.body.interval).toEqual(3600);

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
      choices: [1700559000, 1700562600],
    });
    expect(markFirstTimeRes.body.marked[0].choices).toEqual([1700559000, 1700562600]);

    const getPollFirstTime: PollProps | null = await Poll.findOne({ _id: pollID }).lean();
    expect(getPollFirstTime!.marked![0].choices).toEqual([1700559000, 1700562600]);

    const markSecondTimeRes = await request.put(`/v1/poll/${pollID}`).send({
      userID: 'elon',
      choices: [1700562600, 1700566200],
    });
    expect(markSecondTimeRes.body.marked[1].choices).toEqual([1700562600, 1700566200]);

    const getPollSecondTime: PollProps | null = await Poll.findOne({ _id: pollID }).lean();
    expect(getPollSecondTime!.marked![1].choices).toEqual([1700562600, 1700566200]);

    done();
  });

  it('Should allow a user to mark on a poll and edit any number of times', async (done) => {
    const markFirstTimeRes = await request.put(`/v1/poll/${pollID}`).send({
      userID: 'dbowie',
      choices: [1700559000, 1700562600],
    });
    expect(markFirstTimeRes.body.marked[0].choices).toEqual([1700559000, 1700562600]);

    const getPollFirstTime: PollProps | null = await Poll.findOne({ _id: pollID }).lean();
    expect(getPollFirstTime!.marked![0].choices).toEqual([1700559000, 1700562600]);

    const markSecondTimeRes = await request.put(`/v1/poll/${pollID}`).send({
      userID: 'dbowie',
      choices: [1700562600, 1700566200],
    });
    expect(markSecondTimeRes.body.marked[0].choices).toEqual([1700562600, 1700566200]);

    const getPollSecondTime: PollProps | null = await Poll.findOne({ _id: pollID }).lean();
    expect(getPollSecondTime!.marked![0].choices).toEqual([1700562600, 1700566200]);

    done();
  });

  it('Should not allow users to mark on a closed poll', async (done) => {
    const markFirstTimeRes = await request.put(`/v1/poll/${pollID}`).send({
      userID: 'starman',
      choices: [1700559000],
    });
    expect(markFirstTimeRes.body.finalChoice).toEqual(1700559000);

    const getPollFirstTime: PollProps | null = await Poll.findOne({ _id: pollID }).lean();
    expect(getPollFirstTime!.finalChoice).toEqual(1700559000);
    expect(getPollFirstTime!.open).toEqual(false);

    const markSecondTimeRes = await request.put(`/v1/poll/${pollID}`).send({
      userID: 'dbowie',
      choices: [1700562600, 1700566200],
    });
    expect(markSecondTimeRes.body.message).toEqual('Poll closed');
    done();
  });

  it('Should allow poll creator to mark again on a closed poll', async (done) => {
    const markFirstTimeRes = await request.put(`/v1/poll/${pollID}`).send({
      userID: 'starman',
      choices: [1700559000],
    });
    expect(markFirstTimeRes.body.finalChoice).toEqual(1700559000);

    const getPollFirstTime: PollProps | null = await Poll.findOne({ _id: pollID }).lean();
    expect(getPollFirstTime!.finalChoice).toEqual(1700559000);
    expect(getPollFirstTime!.open).toEqual(false);

    const markSecondTimeRes = await request.put(`/v1/poll/${pollID}`).send({
      userID: 'starman',
      choices: [1700562600],
    });
    expect(markSecondTimeRes.body.finalChoice).toEqual(1700562600);

    const getPollSecondTime: PollProps | null = await Poll.findOne({ _id: pollID }).lean();
    expect(getPollSecondTime!.finalChoice).toEqual(1700562600);
    expect(getPollSecondTime!.open).toEqual(false);
    done();
  });

  it('Should not allow invalid slot choices', async (done) => {
    const markRes = await request.put(`/v1/poll/${pollID}`).send({
      userID: 'dbowie',
      choices: [1700559006, 1700562609],
    });
    expect(markRes.body.message).toEqual('Invalid choices');
    done();
  });
});
