import { test, expect } from '@playwright/test';



test.describe('Books API Tests', () => {
    const baseurl = "https://fakerestapi.azurewebsites.net/api/v1";

    test('GET - Retrieve all books', async ({ request }) => {


        const response = await request.get(`${baseurl}/Books`);

        expect(response.ok()).toBeTruthy();   //expect the value must be true only.
        expect(response.status()).toBe(200);

        const books = await response.json();

        console.log('response :', books);

        expect(Array.isArray(books)).toBeTruthy();

        expect(books.length).toBeGreaterThan(0);

        console.log("books 1st entry:", books[0]);
        const firstBookEntry = books[0];

        // Validate first book structure
        expect(firstBookEntry).toHaveProperty('id');
        expect(firstBookEntry).toHaveProperty('title');
        expect(firstBookEntry).toHaveProperty('description');
        expect(firstBookEntry).toHaveProperty('pageCount');
        expect(firstBookEntry).toHaveProperty('excerpt');

    });

    test('GET - Retrieve single book by ID', async ({ request }) => {
        const bookId = 1;
        const response = await request.get(`${baseurl}/Books/${bookId}`);

        expect(response.ok()).toBeTruthy();
        expect(response.status()).toBe(200);
        const book = await response.json();
        console.log('bookResponse:', book);

        expect(book.id).toBe(bookId);  //response's id is equal to 1 or not.
        expect(book.title).toBeDefined();
        expect(book.title).toBe(`Book ${bookId}`);
        expect(typeof book.pageCount).toBe('number');
    });

     test('POST - Create a new book', async ({ request }) => {
        //payload define

        const newBook = {
        id: 999,
        title: 'Playwright API Testing Guide',
        description: 'Complete guide to API testing with Playwright',
        pageCount: 350,
        excerpt: 'Learn API testing from scratch',
        publishDate: new Date().toISOString()
        };

        const response = await request.post(`${baseurl}/Books`, {
        data: newBook
        });  //.post('endpoint',{data: payload})

        expect(response.status()).toBe(200);
        const createdBook = await response.json();
        
        expect(createdBook.title).toBe(newBook.title); //title should be this : Playwright API Testing Guide
        expect(createdBook.pageCount).toBe(newBook.pageCount); //it should be 350
    });


    test('PUT - Update existing book', async ({ request }) => {
        const bookId = 999;
        const updatedBook = {
        id: bookId,
        title: 'Updated Book Title',
        description: 'Updated description',
        pageCount: 400,
        excerpt: 'Updated excerpt',
        publishDate: new Date().toISOString()
        };

        const response = await request.put(`${baseurl}/Books/${bookId}`, {
        data: updatedBook
        });

        expect(response.status()).toBe(200);
        const book = await response.json();
        expect(book.title).toBe(updatedBook.title); //asserting the title should be : Updated Book Title
    });

    test('DELETE - Remove a book', async ({ request }) => {
        const bookId = 1;
        const response = await request.delete(`${baseurl}/Books/${bookId}`);
        
        expect(response.status()).toBe(200);
        //ideal scenario
        //you have to use the get call/method for ensuring that on that specific Id there is no entry present.
    });


    test('Validate response headers', async ({ request }) => {
        const response = await request.get(`${baseurl}/Books`);
        
        expect(response.headers()['content-type']).toContain('application/json');
        expect(response.headers()['content-type']).toContain('charset=utf-8');
    });



});