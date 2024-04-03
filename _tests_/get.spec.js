const server = require('../server')
const supertest = require('supertest');
const { expect } = require('@jest/globals');
const request = supertest(server)



describe('Test Handlers', () => {
    test('responds to /books', async () => {
        const res = await request(server).get('/books');
        expect(res.header['content-type']).toBe('application/json; charset=utf-8');
        expect(typeof res.statusCode).toBe('number')
    });

    // test('responds to /users', async () => {
    //     const res = await request.get('/books');
    //     expect(res.header["Content-Type"]).toBe("application/json; charset=utf-8");
    //     expect(res.statusCode).toBe(200)
    // })
})
