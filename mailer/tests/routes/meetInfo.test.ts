import supertest from 'supertest';
import app from '../../src/app';

const request = supertest(app);

describe('send poll url', () => {
    it('Should send emails', async (done) => {
        const emailRes = await request.post('/v1/meetInfo').send({
            pollID: 'iuaufh87a6574',
            pollTitle: 'Hello poll',
            senderName: 'John Doe',
            senderEmailID: 'sender@mail.com',
            receiverIDs: ['receiver@mail.com'],
        });
        expect(emailRes.body.sent).toEqual(true);
        done();
    });
});
