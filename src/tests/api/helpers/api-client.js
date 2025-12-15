export class ApiClient {
  constructor(request) {
    this.request = request;
    this.baseUrl = 'https://fakerestapi.azurewebsites.net/api/v1';
  }

  async getBooks() {
    return await this.request.get(`${this.baseUrl}/Books`);
  }

  async getBookById(id) {
    return await this.request.get(`${this.baseUrl}/Books/${id}`);
  }

  async createBook(bookData) {
    return await this.request.post(`${this.baseUrl}/Books`, {
      data: bookData
    });
  }

  async updateBook(id, bookData) {
    return await this.request.put(`${this.baseUrl}/Books/${id}`, {
      data: bookData
    });
  }

  async deleteBook(id) {
    return await this.request.delete(`${this.baseUrl}/Books/${id}`);
  }

  // Generic endpoints
  async get(endpoint) {
    return await this.request.get(`${this.baseUrl}${endpoint}`);
  }

  async post(endpoint, data) {
    return await this.request.post(`${this.baseUrl}${endpoint}`, { data });
  }
}

//usage in tests
// import { test } from '@playwright/test';
// import { ApiClient } from './ApiClient';

// test('API demo', async ({ request }) => {
//   const api = new ApiClient(request);

//   const books = await api.getBooks();
//   console.log(await books.json());
// });
