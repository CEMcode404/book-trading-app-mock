// @ts-check
import { expect, test } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("/policies");
});

testLinkIfClickScrolledTo("Terms of Use", "#termsOfUse");
testLinkIfClickScrolledTo("Safety and Security", "#safetyAndSecurity");
testLinkIfClickScrolledTo("Data Privacy", "#dataPrivacy");
testLinkIfClickScrolledTo("Credits", "#credits");

function testLinkIfClickScrolledTo(sectionName, sectionId) {
  test(`'${sectionName}' click should scroll to ${sectionName} section`, async ({
    page,
  }) => {
    await page
      .locator(".policy-page__navlink")
      .filter({ hasText: sectionName })
      .click();

    const section = page.locator(sectionId);

    await expect(section).toBeInViewport();
  });
}
