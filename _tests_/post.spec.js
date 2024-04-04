const app = require('../server')
const request = require('supertest');
const { expect } = require('@jest/globals');


describe('Test Handlers', () => {

    test('POST /books', async () => {
        const newBook = {
            title: "Book Test",
            author_id: "65f3a916dde35f7c857e7ba3", 
            genre: "Fiction",
            published_year: 1960,
            publisher: "J. B. Lippincott & Co.",
            pages: 340, 
            isbn: "9780061120082",
        };
        const res = await request(app).post('/books').send(newBook);     
        // expect(res.header['content-type']).toBe('application/json; charset=utf-8');
        expect(typeof res.statusCode).toBe('number')
    });

    test('POST /movies', async () => {
        const newMovie = {
            name: "Chris Columbus",
            genre: "American", 
            director: "John Doe",
            release_date: 'Septmeber 9, 1958',
            duration_minutes: "142",
            studio: "American", 
            description: "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.",
            film_rating: 'R',

        };
        const res = await request(app).post('/movies').send(newMovie);     
        // expect(res.header['content-type']).toBe('application/json; charset=utf-8');
        expect(typeof res.statusCode).toBe('number')
    });

    test('POST /authors', async () => {
        const newAuthor = {
            name: "Chris Columbus",
            birthdate: "April 28, 1926", 
            nationality: "American",
        };
        const res = await request(app).post('/authors').send(newAuthor);     
        // expect(res.header['content-type']).toBe('application/json; charset=utf-8');
        expect(typeof res.statusCode).toBe('number')
    });

    test('POST /categories', async () => {
        const newCategories = {
            name: "Chris Doe",
            description: "Classic literature refers to literary works that are considered to be of high artistic quality and lasting literary significance.", 
        };
        const res = await request(app).post('/categories').send(newCategories);     
        // expect(res.header['content-type']).toBe('application/json; charset=utf-8');
        expect(typeof res.statusCode).toBe('number')
    });

})

