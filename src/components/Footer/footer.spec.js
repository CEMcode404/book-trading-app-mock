// @ts-check
import { expect, test } from "@playwright/test";
import reviews from "../../mockDatas/reviews.json";

test.describe("footer", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test.describe("about us", () => {
    let titleBar, textContent;
    test.beforeEach(({ page }) => {
      titleBar = page.getByText("ABOUT US");
      textContent = page.getByText("Booktrade.com is a company");
    });

    test("show about us details when click", async () => {
      await titleBar.click();
      await textContent.scrollIntoViewIfNeeded();

      await expect(textContent).toBeInViewport();
    });

    test("is hidden after clicking the second time", async () => {
      await titleBar.click();
      await titleBar.click();
      await textContent.scrollIntoViewIfNeeded();

      await expect(textContent).not.toBeInViewport();
    });

    test("is hidden onload", async () => {
      await textContent.scrollIntoViewIfNeeded();

      await expect(textContent).not.toBeInViewport();
    });
  });

  test.describe("message us", () => {
    let titleBar, form, sendBttn, messageField, emailField;
    test.beforeEach(({ page }) => {
      titleBar = page.getByText("MESSAGE US");
      form = page.getByRole("form");
      sendBttn = page.getByRole("button", { name: "Send" });
      messageField = page.getByPlaceholder("message");
      emailField = page.getByPlaceholder("email");
    });

    test("show form when click", async () => {
      await titleBar.click();
      await form.scrollIntoViewIfNeeded();

      await expect(form).toBeInViewport();
    });

    test("is hidden after clicking the second time", async () => {
      await titleBar.click();
      await titleBar.click();
      await form.scrollIntoViewIfNeeded();

      await expect(form).not.toBeInViewport();
    });

    test("is hidden onload", async () => {
      await expect(form).not.toBeInViewport();
    });

    test("message and email fields show errors if empty on submit", async ({
      page,
    }) => {
      const errors = page.getByText("is a required");

      await titleBar.click();
      await page.getByRole("button", { name: "Send" }).click();

      await expect(errors).toHaveCount(2);
    });

    test("reset form if submission succeeded", async ({ page }) => {
      const errors = page
        .getByText("is a required")
        .and(page.getByText("must be a valid email"));

      await titleBar.click();
      await messageField.fill("valid input");
      await emailField.fill("validinput@gmail.com");
      await sendBttn.click();

      await expect(messageField).toBeEmpty();
      await expect(emailField).toBeEmpty();
      await expect(errors).toHaveCount(0);
    });

    test("email field show error if invalid email", async ({ page }) => {
      const error = page.getByText("must be a valid email");

      await titleBar.click();
      await emailField.fill("invalid email");
      await sendBttn.click();

      await expect(error).toHaveCount(1);
    });
  });

  test.describe("links", () => {
    test("Reviews and Testimonials should navigate you to testimonial page", async ({
      page,
    }) => {
      await page.route(`/api/review/getReviews`, async (route) => {
        await route.fulfill({ json: reviews });
      });
      await page.getByText("Reviews and Testimonials").click();

      expect(page.url()).toContain("/reviews");
    });

    testLink("Safety and Security", "/policies#safetyAndSecurity");
    testLink("Terms of Use", "/policies#termsOfUse");
    testLink("Data Privacy", "/policies#dataPrivacy");
    testLink("Credits", "/policies#credits");
  });
});

function testLink(text, path) {
  test(text, async ({ page }) => {
    await page.getByText(text).click();

    expect(page.url()).toContain(path);
  });
}
