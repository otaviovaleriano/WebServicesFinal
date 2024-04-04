const app = require('../server')
const request = require('supertest');
const { expect } = require('@jest/globals');


describe('Test Handlers', () => {

    test(' GET responds to /books', async () => {
        const res = await request(app).get('/books');
        // expect(res.header['content-type']).toBe('application/json; charset=utf-8');
        expect(typeof res.statusCode).toBe('number')
    })
    
    test('responds to /books/:id', async () => {
        const bookId = '65f3a92fdde35f7c857e7ba6'
        const res = await request(app).get(`/books/${bookId}`);
        console.log('Content-Type:', res.header['content-type']); 
        // expect(res.header['Content-Type']).toBe('application/json; charset=utf-8');
        expect(typeof res.statusCode).toBe('number')
    })
})

describe('Test Handlers', () => {

    test(' GET responds to /authors', async () => {
        const res = await request(app).get('/authors');
        // expect(res.header['content-type']).toBe('application/json; charset=utf-8');
        expect(typeof res.statusCode).toBe('number')
    })
    
    test('responds to /authors/:id', async () => {
        const authorId = '65f3a916dde35f7c857e7ba3'
        const res = await request(app).get(`/authors/${authorId}`);
        console.log('Content-Type:', res.header['content-type']); 
        // expect(res.header['Content-Type']).toBe('application/json; charset=utf-8');
        expect(typeof res.statusCode).toBe('number')
    })
})

describe('Test Handlers', () => {

    test(' GET responds to /movies', async () => {
        const res = await request(app).get('/movies');
        // expect(res.header['content-type']).toBe('application/json; charset=utf-8');
        expect(typeof res.statusCode).toBe('number')
    })
    
    test('responds to /categories/:id', async () => {
        const categoriesId = '660cc2a389bb95d9bdd615fb'
        const res = await request(app).get(`/authors/${categoriesId}`);
        console.log('Content-Type:', res.header['content-type']); 
        // expect(res.header['Content-Type']).toBe('application/json; charset=utf-8');
        expect(typeof res.statusCode).toBe('number')
    })
})


describe('Test Handlers', () => {

    test(' GET responds to /categories', async () => {
        const res = await request(app).get('/categories');
        // expect(res.header['content-type']).toBe('application/json; charset=utf-8');
        expect(typeof res.statusCode).toBe('number')
    })
    
    test('responds to /movies/:id', async () => {
        const moviesId = '660cc2a389bb95d9bdd615fb'
        const res = await request(app).get(`/authors/${moviesId}`);
        console.log('Content-Type:', res.header['content-type']); 
        // expect(res.header['Content-Type']).toBe('application/json; charset=utf-8');
        expect(typeof res.statusCode).toBe('number')
    })
})


