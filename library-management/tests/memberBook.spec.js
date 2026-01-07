import { test, expect } from '@playwright/test';

test('Member Book', async ({ page }) => {
  await page.goto('http://localhost:5173/');
  await page.getByRole('textbox', { name: 'Email' }).click();
  await page.getByRole('textbox', { name: 'Email' }).fill('');
  await page.getByRole('textbox', { name: 'Email' }).click();
  await page.getByRole('textbox', { name: 'Email' }).fill('bharathiannadurai25@gmail.com');
  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill('Bharathi@25');
  await page.getByRole('button').filter({ hasText: /^$/ }).click();
  await page.getByRole('button').filter({ hasText: /^$/ }).click();
  await page.locator('form').getByRole('button', { name: 'Login' }).click();
  await page.getByRole('button').filter({ hasText: /^$/ }).click();
  await page.getByRole('menuitem', { name: 'Store' }).click();
  await page.getByRole('button', { name: 'Return Book' }).first().click();
  await page.getByRole('button', { name: 'Yes, Return' }).click();
  await page.getByRole('button', { name: 'Add to store' }).nth(1).click();
  await page.getByRole('button', { name: 'Add to store' }).click();
});