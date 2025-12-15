import { test, expect } from '@playwright/test';

test.describe('Activities API Tests', () => {
  const BASE_URL = 'https://fakerestapi.azurewebsites.net/api/v1';

  test('GET - Retrieve all activities', async ({ request }) => {
    const response = await request.get(`${BASE_URL}/Activities`);
    
    expect(response.ok()).toBeTruthy();
    const activities = await response.json();
    
    expect(Array.isArray(activities)).toBeTruthy();
    
    // Validate activity structure
    const activity = activities[0];
    expect(activity).toHaveProperty('id');
    expect(activity).toHaveProperty('title');
    expect(activity).toHaveProperty('dueDate');
    expect(activity).toHaveProperty('completed');
  });

  test('POST - Create activity with validation', async ({ request }) => {
    const newActivity = {
      id: 500,
      title: 'Complete API Testing',
      dueDate: '2025-12-31T23:59:59.000Z',
      completed: false
    };

    const response = await request.post(`${BASE_URL}/Activities`, {
      data: newActivity
    });

    expect(response.status()).toBe(200);
    const activity = await response.json();
    
    expect(activity.title).toBe(newActivity.title);
    expect(activity.completed).toBe(false);
  });

  test('Response time validation', async ({ request }) => {
    const startTime = Date.now();
    await request.get(`${BASE_URL}/Activities`);
    const endTime = Date.now();
    
    const responseTime = endTime - startTime;
    expect(responseTime).toBeLessThan(3000); // Should respond within 3 seconds
  });
});