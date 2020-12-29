import supertest from 'supertest';
import app from '../../src/app';

const request = supertest(app);

// testing the mailer
describe('send email', () => {
    it('Should send emails', async (done) => {
        const emailRes = await request.post('/v1/meetInfo').send({
            pollID: 'k8255935hjloef0af154a68',
            senderID: '9460593545ba3f0af154a68',
            receiverIDs: ['rocketmeet@gmail.com'],
        });

        expect(emailRes.status).toEqual(200);
        done();
    });
});
