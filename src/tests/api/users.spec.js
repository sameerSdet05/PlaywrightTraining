import { test, expect } from '@playwright/test';

test.describe('Users API Tests', () => {
  const BASE_URL = 'https://fakerestapi.azurewebsites.net/api/v1';

  test('GET - Fetch all users', async ({ request }) => {
    const response = await request.get(`${BASE_URL}/Users`);
    
    expect(response.ok()).toBeTruthy();
    const users = await response.json();
    
    expect(Array.isArray(users)).toBeTruthy();
    expect(users.length).toBeGreaterThan(0);
    
    // Validate user schema
    const user = users[0];
    expect(user).toHaveProperty('id');
    expect(user).toHaveProperty('userName');
    expect(user).toHaveProperty('password');
  });

  test('POST - Create new user', async ({ request }) => {
    const newUser = {
      id: 100,
      userName: 'testuser@playwright.dev',
      password: 'SecurePass123!'
    };

    const response = await request.post(`${BASE_URL}/Users`, {
      data: newUser
    });

    expect(response.status()).toBe(200);
    const createdUser = await response.json();
    
    expect(createdUser.userName).toBe(newUser.userName);
    expect(createdUser.id).toBeDefined();
  });

  test('Validate user data types', async ({ request }) => {
    const response = await request.get(`${BASE_URL}/Users/1`);
    const user = await response.json();
    
    expect(typeof user.id).toBe('number');
    expect(typeof user.userName).toBe('string');
    expect(typeof user.password).toBe('string');
  });
});