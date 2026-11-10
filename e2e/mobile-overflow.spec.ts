import { expect, Page, test } from "@playwright/test";
import { readFileSync } from "fs";
import { join } from "path";

const docIds = readFileSync(
  join(__dirname, "..", "src", "assets", "documentation", "doclist.txt"),
  "utf8"
)
  .split("\n")
  .map((l) =>
    l
      .replace(".md", "")
      .split("/")
      .filter((n) => n)
      .map((n) => n.replace(/<.*?>/g, "").trim())
  )
  .filter((parts) => parts.length)
  .map((parts) => parts.join("+"));

interface Offender {
  selector: string;
  right: number;
}

async function measureOverflow(page: Page) {
  // Mobile browsers zoom out to fit overflowing content, which inflates
  // window.innerWidth, so compare against the emulated device width.
  const viewportWidth = page.viewportSize()!.width;
  return page.evaluate((innerWidth) => {
    const describe = (el: Element) => {
      const id = el.id ? `#${el.id}` : "";
      const cls =
        typeof el.className === "string" && el.className.trim()
          ? "." + el.className.trim().split(/\s+/).slice(0, 4).join(".")
          : "";
      return `${el.tagName.toLowerCase()}${id}${cls}`;
    };
    const offenders: Offender[] = [];
    const isClipped = (el: Element) => {
      for (let a = el.parentElement; a && a !== document.body; a = a.parentElement) {
        if (getComputedStyle(a).overflowX !== "visible") return true;
      }
      return false;
    };
    for (const el of Array.from(document.body.querySelectorAll("*"))) {
      const rect = el.getBoundingClientRect();
      // scrollWidth catches overflowing text nodes (e.g. long unbroken URLs).
      const right = Math.max(rect.right, rect.left + el.scrollWidth);
      if (rect.width === 0 || right <= innerWidth + 1) continue;
      // Only report elements whose parent does not already overflow, i.e. the root cause.
      const parent = el.parentElement;
      const parentRight = parent?.getBoundingClientRect().right ?? 0;
      if (parent && parentRight > innerWidth + 1) continue;
      if (isClipped(el)) continue;
      offenders.push({ selector: describe(el), right: Math.round(right) });
    }
    // Inner scroll containers that scroll sideways (e.g. overflow-y:scroll
    // implicitly makes overflow-x auto). Intentional ones are excluded.
    const allowedScrollers =
      "pre, .html-content table, .cm-scroller, .cm-editor *";
    const scrollers = Array.from(document.body.querySelectorAll("*"))
      .filter((el) => {
        const style = getComputedStyle(el);
        return (
          ["auto", "scroll"].includes(style.overflowX) &&
          el.scrollWidth > el.clientWidth + 1 &&
          el.clientWidth > 0 &&
          !el.matches(allowedScrollers)
        );
      })
      .map((el) => `${describe(el)} (${el.clientWidth} < ${el.scrollWidth})`);
    return {
      scrollWidth: Math.max(
        document.documentElement.scrollWidth,
        document.body.scrollWidth
      ),
      innerWidth,
      offenders,
      scrollers,
    };
  }, viewportWidth);
}

async function expectNoHorizontalOverflow(page: Page, name: string) {
  await page.waitForTimeout(500);
  const result = await measureOverflow(page);
  await page.screenshot({
    path: test.info().outputPath(`${name}.png`),
    fullPage: true,
  });
  const isMobile = !!test.info().project.use.isMobile;
  if (result.scrollWidth > result.innerWidth || (isMobile && result.scrollers.length)) {
    console.log(
      `[${test.info().project.name}] ${name}: scrollWidth=${result.scrollWidth} innerWidth=${result.innerWidth}\n` +
        result.offenders.map((o) => `  ${o.selector} (right=${o.right})`).join("\n") +
        result.scrollers.map((s) => `\n  scroller: ${s}`).join("")
    );
  }
  expect(
    result.scrollWidth,
    `horizontal overflow on ${name}: ${JSON.stringify(result.offenders)}`
  ).toBeLessThanOrEqual(result.innerWidth);
  if (isMobile) {
    expect(result.scrollers, `horizontal inner scrolling on ${name}`).toEqual([]);
  }
}

async function waitForDocContent(page: Page) {
  await page.waitForSelector(".html-content", { state: "attached" });
  await page.waitForFunction(
    () => !document.querySelector(".html-content .loading-container")
  );
}

test.describe("no horizontal overflow", () => {
  test("welcome / links page", async ({ page }) => {
    await page.goto("/#/links", { waitUntil: "domcontentloaded" });
    await page.waitForLoadState("networkidle");
    await expectNoHorizontalOverflow(page, "links");
  });

  test("editor page", async ({ page }) => {
    await page.goto("/#/", { waitUntil: "domcontentloaded" });
    await page.waitForSelector("core-app");
    await page.waitForLoadState("networkidle");
    await expectNoHorizontalOverflow(page, "editor");
  });

  test("docs index", async ({ page }) => {
    await page.goto("/#/docs", { waitUntil: "domcontentloaded" });
    await waitForDocContent(page);
    await expectNoHorizontalOverflow(page, "docs-index");
  });

  for (const docId of docIds) {
    const safeName = docId.replace(/[^a-z0-9]+/gi, "_");
    // The markdown converter never finishes rendering this large doc (pre-existing, unrelated to layout).
    const docTest = docId === "tutorials+tutorials" ? test.fixme : test;

    docTest(`doc ${docId}`, async ({ page }) => {
      await page.goto(`/#/docs/${encodeURIComponent(docId)}`, { waitUntil: "domcontentloaded" });
      await waitForDocContent(page);
      await expectNoHorizontalOverflow(page, `doc_${safeName}`);

      const tryIt = page.locator(".html-content button.run-code").first();
      if (await tryIt.count()) {
        await tryIt.click();
        await page.waitForURL(/tryIt=/);
        await page.waitForTimeout(800);
        await expectNoHorizontalOverflow(page, `doc_${safeName}_tryit`);
      }
    });
  }
});

test.describe("no horizontal overflow (Hebrew docs)", () => {
  test.beforeEach(async ({ page }) => {
    await page.addInitScript(() => localStorage.setItem("docsLanguage", "he"));
  });

  for (const docId of docIds) {
    const safeName = docId.replace(/[^a-z0-9]+/gi, "_");
    // Same pre-existing rendering issue as the English version of this doc.
    const docTest = docId === "tutorials+tutorials" ? test.fixme : test;

    docTest(`he doc ${docId}`, async ({ page }) => {
      await page.goto(`/#/docs/${encodeURIComponent(docId)}`, { waitUntil: "domcontentloaded" });
      await waitForDocContent(page);
      await expect(page.locator(".html-content .docs-content")).toHaveAttribute("dir", "rtl");
      await expectNoHorizontalOverflow(page, `he_doc_${safeName}`);
    });
  }
});
