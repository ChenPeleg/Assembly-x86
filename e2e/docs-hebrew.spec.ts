import { expect, test } from "@playwright/test";

const firstPage = "/#/docs/00%20quickstart%2B01%20getting-started";
const translatedPage = "/#/docs/01%20basics%2B02%20hello%20world";
const untranslatedPage = "/#/docs/01%20basics%2B03%20binary%20numbers";

const docsContent = (page: import("@playwright/test").Page) =>
  page.locator(".html-content .docs-content");

test("documentation defaults to English, left-to-right", async ({ page }) => {
  await page.goto(firstPage, { waitUntil: "domcontentloaded" });
  await expect(docsContent(page)).toHaveAttribute("dir", "ltr");
  await expect(docsContent(page)).toHaveAttribute("lang", "en");
  await expect(docsContent(page).locator("h1").first()).toHaveText(
    "Quick Start Guide"
  );
  await expect(
    page.getByRole("button", { name: "English" })
  ).toHaveAttribute("aria-pressed", "true");
});

test("language toggle is shown only on the first documentation page", async ({
  page,
}) => {
  await page.goto(translatedPage, { waitUntil: "domcontentloaded" });
  await expect(docsContent(page)).toBeVisible();
  await expect(page.locator("#docs-language-toggle")).toHaveCount(0);
});

test("Hebrew is persisted, rendered RTL with LTR code, and falls back to English", async ({
  page,
}) => {
  await page.goto(firstPage, { waitUntil: "domcontentloaded" });
  await page.getByRole("button", { name: "עברית" }).click();

  await expect(docsContent(page)).toHaveAttribute("dir", "rtl");
  await expect(docsContent(page)).toHaveAttribute("lang", "he");
  await expect(docsContent(page).locator("h1").first()).toHaveText(
    "מדריך התחלה מהירה"
  );
  expect(
    await page.evaluate(() => localStorage.getItem("docsLanguage"))
  ).toBe("he");

  const codeDirection = await docsContent(page)
    .locator("div.code-block pre")
    .first()
    .evaluate((el) => getComputedStyle(el).direction);
  expect(codeDirection).toBe("ltr");

  // The preference survives a reload and applies to other translated pages.
  await page.goto(translatedPage, { waitUntil: "domcontentloaded" });
  await page.reload({ waitUntil: "domcontentloaded" });
  await expect(docsContent(page)).toHaveAttribute("dir", "rtl");

  // Runnable snippets still load into the emulator.
  await page.getByRole("button", { name: "Try me" }).click();
  await expect(page).toHaveURL(/tryIt=/);

  // Pages without a translation fall back to the English source, LTR.
  await page.goto(untranslatedPage, { waitUntil: "domcontentloaded" });
  await expect(docsContent(page)).toHaveAttribute("dir", "ltr");
  await expect(docsContent(page)).toHaveAttribute("lang", "en");

  // Switching back to English restores the default.
  await page.goto(firstPage, { waitUntil: "domcontentloaded" });
  await page.getByRole("button", { name: "English" }).click();
  await expect(docsContent(page)).toHaveAttribute("dir", "ltr");
  await expect(docsContent(page).locator("h1").first()).toHaveText(
    "Quick Start Guide"
  );
});
