import supertest from 'supertest';
import app from '../../src/app';

jest.mock('nodemailer');

const request = supertest(app);

describe('send email', () => {
    it('Should send emails', async (done) => {
        const emailRes = await request.post('/meetInfo/mail').send({
            id: '9460593545ba3f0af154a68',
            email: ['rocketmeet@gmail.com'],
        });

        expect(emailRes.status).toBe(200);
        done();
    });
});