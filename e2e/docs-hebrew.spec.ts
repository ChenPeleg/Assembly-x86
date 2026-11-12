import { expect, test } from "@playwright/test";

const firstPage = "/#/docs/00%20quickstart%2B01%20getting-started";
const translatedPage = "/#/docs/01%20basics%2B02%20hello%20world";
// Every page is translated, so the fallback test makes this page's Hebrew file "missing".
const untranslatedPage = "/#/docs/01%20basics%2B03%20binary%20numbers";
const untranslatedHebrewFile = "/documentation/he/01 basics/03 binary numbers.md";

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
  await expect(page.locator("h2.text-lg")).toHaveText(
    "0.1 quickstart - getting-started"
  );
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
  await page.route(
    (url) => decodeURIComponent(url.pathname).endsWith(untranslatedHebrewFile),
    (route) => route.fulfill({ status: 404, body: "Not found" })
  );
  await page.goto(firstPage, { waitUntil: "domcontentloaded" });
  await page.getByRole("button", { name: "עברית" }).click();

  // The page reloads in Hebrew; allow extra time when the dev server is busy.
  await expect(docsContent(page)).toHaveAttribute("dir", "rtl", { timeout: 15_000 });
  await expect(docsContent(page)).toHaveAttribute("lang", "he");
  await expect(docsContent(page).locator("h1").first()).toHaveText(
    "מדריך התחלה מהירה"
  );
  // The page header and table of contents use the translated titles.
  await expect(page.locator("h2.text-lg")).toHaveText(
    "0.1 התחלה מהירה - צעדים ראשונים"
  );
  await expect(page.locator("#content-table-root")).toContainText("1 יסודות");
  // The docs view's own labels follow the selected language.
  await expect(page.locator("#content-table-root h2")).toHaveText("תוכן העניינים");
  await expect(page.locator("#documentation-navigation")).toContainText("הבא");
  // In Hebrew the navigation is mirrored: "previous" on the right, "next" on the left.
  await expect(page.locator("#documentation-navigation")).toHaveAttribute("dir", "rtl");
  const navigationButtons = page.locator("#documentation-navigation button");
  const previousBox = await navigationButtons.first().boundingBox();
  const nextBox = await navigationButtons.last().boundingBox();
  expect(nextBox!.x).toBeLessThan(previousBox!.x);
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
  await page.getByRole("button", { name: "נסו אותי" }).click();
  await expect(page).toHaveURL(/tryIt=/);

  // Pages without a translation fall back to the English source, LTR.
  await page.goto(untranslatedPage, { waitUntil: "domcontentloaded" });
  await expect(docsContent(page)).toHaveAttribute("dir", "ltr");
  await expect(docsContent(page)).toHaveAttribute("lang", "en");
  await expect(
    docsContent(page).getByRole("button", { name: "Try me" }).first()
  ).toBeVisible();

  // Switching back to English restores the default.
  await page.goto(firstPage, { waitUntil: "domcontentloaded" });
  await page.getByRole("button", { name: "English" }).click();
  await expect(docsContent(page)).toHaveAttribute("dir", "ltr");
  await expect(docsContent(page).locator("h1").first()).toHaveText(
    "Quick Start Guide"
  );
});

test("docs landing page is shown in the selected language", async ({ page }) => {
  await page.goto("/#/docs", { waitUntil: "domcontentloaded" });
  await expect(docsContent(page)).toContainText("Welcome to the Assembly x86");
  await page.getByRole("button", { name: "עברית" }).click();
  await expect(docsContent(page)).toHaveAttribute("dir", "rtl", { timeout: 15_000 });
  await expect(docsContent(page)).toContainText("ברוכים הבאים");
});
