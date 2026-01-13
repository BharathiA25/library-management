import { test, expect } from '@playwright/test';

test('Admin Member test', async ({ page }) => {
  await page.goto('http://localhost:5173/');
  await page.getByRole('textbox', { name: 'Email' }).click();
  await page.getByRole('textbox', { name: 'Email' }).click();
  await page.getByRole('textbox', { name: 'Email' }).fill('kvaishnavi.242001@gmail.com');
  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByRole('textbox', { name: 'Password' }).press('CapsLock');
  await page.getByRole('textbox', { name: 'Password' }).fill('V');
  await page.getByRole('textbox', { name: 'Password' }).press('CapsLock');
  await page.getByRole('textbox', { name: 'Password' }).fill('Vaish@1223');
  await page.getByRole('button').filter({ hasText: /^$/ }).click();
  await page.getByRole('button').filter({ hasText: /^$/ }).click();
  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill('Vaish@123');
  await page.getByRole('button').filter({ hasText: /^$/ }).click();
  await page.getByRole('button').filter({ hasText: /^$/ }).click();
  await page.locator('form').getByRole('button', { name: 'Login' }).click();
  await page.getByRole('button', { name: 'Active' }).nth(4).click();
  await page.getByRole('button', { name: 'Deactivate' }).click();
  await page.getByRole('button', { name: 'Delete' }).nth(1).click();
  await page.getByRole('button', { name: 'Delete' }).click();
});