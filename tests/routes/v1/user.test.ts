import supertest, { SuperTest, Test } from 'supertest';
import dbHandler from '../../db-handler';
import app from '../../../src/app';
import isChoicePresentInPollChoices from '../../../src/helpers';
import Poll, { RocketMeetPoll } from '../../../src/db/models/poll';

const request: SuperTest<Test> = supertest(app);
const testPoll = {
  title: 'testPoll',
  encryptedEmailID: 'encryptedEmailID',
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
describe.skip('This tests are skipped', () => {
  describe('create poll', () => {
    it('Should save poll to db', async (done) => {
      const res = await request
        .post('/v1/user/poll')
        .send({
          title: 'OccupyMarsMeet',
          encryptedEmailID: 'encryptedEmailID',
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
      const editPollRes = await request
        .put(`/v1/user/poll/${pollID}`)
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
      const getPollRes = await request
        .get(`/v1/user/${testPoll.encryptedEmailID}`);
      expect(getPollRes.body[0].title).toEqual('testPoll');
      done();
    });

    it('Should return nothing if user does not exist', async (done) => {
      const getPollRes = await request
        .get('/v1/poll/user/haha/haha');
      expect(getPollRes.body.message).toEqual(undefined);
      done();
    });
  });

  describe('delete poll', () => {
    it('Should delete poll from db', async (done) => {
      const deletePollRes = await request
        .delete(`/v1/user/poll/${pollID}`);
      expect(deletePollRes.body.title).toEqual(testPoll.title);
      const getPollFirstTime: RocketMeetPoll | null = await Poll.findOne({ _id: pollID }).lean();
      expect(getPollFirstTime).toEqual(null);
      done();
    });

    it('Should throw err if there is no poll to delete', async (done) => {
      const someIdWhichDoesntExist = '5fe141353477a0591da0c98a';
      const deletePollRes = await request
        .delete(`/v1/user/poll/${someIdWhichDoesntExist}`);
      expect(deletePollRes.body.message).toEqual('Poll does not exist');
      done();
    });
  });
});
