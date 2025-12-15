import { test, expect } from '@playwright/test';

test.describe('Authentication API', () => {
  // Note: FakeRestAPI doesn't have real auth, 
  // but here's the pattern for real APIs

  test('Simulated login flow', async ({ request }) => {
    // In a real API, you'd POST credentials
    const loginPayload = {
      username: 'testuser',
      password: 'password123'
    };

    // This is a simulation - adapt to your real API
    const response = await request.post(
      'https://fakerestapi.azurewebsites.net/api/v1/Users',
      { data: loginPayload }
    );

    expect(response.status()).toBe(200);
    
    // In real scenarios, extract token from response
    // const authToken = (await response.json()).token;
  });

  test('Using authentication context', async ({ playwright }) => {
    // Create a context with authentication
    const context = await playwright.request.newContext({
      extraHTTPHeaders: {
        'Authorization': 'Bearer fake-token-for-demo',
        'Content-Type': 'application/json'
      }
    });

    const response = await context.get(
      'https://fakerestapi.azurewebsites.net/api/v1/Books'
    );

    expect(response.ok()).toBeTruthy();
    await context.dispose();
  });
});