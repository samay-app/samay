import { expect } from 'chai';
import SuperTest from 'supertest';
import app from '../../../src/app';

describe('POST /poll', () => {
  it('OK, creating a new poll works', (done) => {
    SuperTest(app).post('/poll')
      .send({
        pollName: 'testPoll',
        userID: 'starman',
        interval: 60,
        choices: [2, 6, 7],
      })
      .then((res) => {
        const { body } = res.body;
        expect(body).to.equal({
          pollName: 'testPoll',
          userID: 'starman',
          interval: 60,
          choices: [2, 6, 7],
        });
        done();
      })
      .catch((err) => done(err));
  });
});