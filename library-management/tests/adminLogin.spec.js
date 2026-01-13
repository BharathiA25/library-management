import { test, expect } from '@playwright/test';

test('admin login', async ({ page }) => {
  await page.goto('http://localhost:5173/');
  await page.getByRole('textbox', { name: 'Email' }).click();
  await page.getByRole('textbox', { name: 'Email' }).fill('kvaishnavi.242001@gmail.com');
  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill('Vaish@123');
  await page.locator('form').getByRole('button', { name: 'Login' }).click();
});