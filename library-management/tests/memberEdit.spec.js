import { test, expect } from '@playwright/test';

test('Member Edit', async ({ page }) => {
  await page.goto('http://localhost:5173/');
  await page.getByRole('textbox', { name: 'Email' }).click();
  await page.getByRole('textbox', { name: 'Email' }).click();
  await page.getByRole('textbox', { name: 'Email' }).fill('bharathiannadurai25@gmail.com');
  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill('Bharathi@25');
  await page.locator('form').getByRole('button', { name: 'Login' }).click();
  await page.getByRole('button').filter({ hasText: /^$/ }).click();
  await page.getByRole('menuitem', { name: 'Edit Profile' }).click();
  await page.getByRole('textbox', { name: 'New Password (optional)' }).click();
  await page.getByRole('textbox', { name: 'New Password (optional)' }).press('CapsLock');
  await page.getByRole('textbox', { name: 'New Password (optional)' }).fill('B');
  await page.getByRole('textbox', { name: 'New Password (optional)' }).press('CapsLock');
  await page.getByRole('textbox', { name: 'New Password (optional)' }).fill('Bharathi@123');
  await page.locator('form').getByRole('button').filter({ hasText: /^$/ }).click();
  await page.locator('form').getByRole('button').filter({ hasText: /^$/ }).click();
  await page.getByRole('button', { name: 'Update Profile' }).click();
});