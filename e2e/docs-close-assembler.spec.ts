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

test("returning from the assembler scrolls to the selected try-it example", async ({
  page,
}) => {
  test.skip((page.viewportSize()?.width ?? 0) >= 768, "Docs button is mobile-only");

  await page.addInitScript(() => {
    HTMLElement.prototype.scrollIntoView = function () {
      (window as any).__lastScrolledElementId = this.id;
    };
  });
  await page.goto("/#/docs/03%20registers%2Bcpu-word-size", {
    waitUntil: "domcontentloaded",
  });

  const examples = page.locator(".html-content .code-block");
  await expect(examples).toHaveCount(2);
  await examples.nth(1).getByRole("button", { name: "Try me" }).click();
  await expect(page).toHaveURL(/tryIt=exm_2/);

  await page.locator('button[title="Return to docs"]').click();

  await expect
    .poll(() =>
      page.evaluate(() => (window as any).__lastScrolledElementId)
    )
    .toBe("exm_2");
});
