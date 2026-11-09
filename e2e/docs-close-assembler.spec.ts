import { expect, test } from "@playwright/test";

test("close assembler is shown only while a docs try-it example is open", async ({
  page,
}) => {
  await page.goto("/#/docs/01%20basics%2B02%20hello%20world", {
    waitUntil: "domcontentloaded",
  });

  const closeAssembler = page.locator('button[title="Close assembler"]');
  await expect(closeAssembler).toBeHidden();

  await page.getByRole("button", { name: "Try me" }).click();
  await expect(page).toHaveURL(/tryIt=/);
  await expect(closeAssembler).toBeVisible();

  await closeAssembler.click();
  await expect(page).not.toHaveURL(/tryIt=/);
  await expect(closeAssembler).toBeHidden();
});
