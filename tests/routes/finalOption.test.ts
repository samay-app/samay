import supertest from 'supertest';
import app from '../../src/app';

const request = supertest(app);

describe('send finalOption', () => {
    it('Should send email', async (done) => {
        const emailRes = await request.post('/v1/finalOption').send({
            senderName: 'John Doe',
            senderEmailID: 'sender@mail.com',
            pollTitle: 'Hello poll',
            finalOption: {
                start: 1611883800000,
                end: 1611887400000,
            },
            receiverIDs: ['receiver@mail.com'],
        });
        expect(emailRes.body.sent).toEqual(true);
        done();
    });
});
