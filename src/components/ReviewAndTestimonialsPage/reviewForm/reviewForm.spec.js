// @ts-check
import { expect, test } from "@playwright/test";
import reviews from "../../../mockDatas/reviews.json";
import { setToLogOutState } from "../../../test/testUtils";

test.beforeEach(async ({ page }) => {
  await page.route(`/api/review/getReviews`, async (route) => {
    await route.fulfill({ json: reviews });
  });
  await page.goto("/reviews");
});

test.describe("logged in", () => {
  let error, sendBttn, textBox;
  test.beforeEach(({ page }) => {
    error = page.getByText("is a required");
    sendBttn = page
      .getByLabel("reviews and testimonials")
      .getByRole("button", { name: "Send" });
    textBox = page.getByLabel("reviews and testimonials").getByRole("textbox");
  });

  test("Error message should appear if textbox is empty", async () => {
    await sendBttn.click();

    await expect(error).toHaveCount(1);
  });

  test("TextBox should reset if submission is succesful", async () => {
    await textBox.fill("test");
    await sendBttn.click();

    await expect(textBox).toBeEmpty();
    await expect(error).toHaveCount(0);
  });
});

test.describe("logged out", () => {
  let notificationPopUp, sendButton;
  test.beforeEach(({ page }) => {
    notificationPopUp = page.getByRole("dialog");
    sendButton = page
      .getByLabel("reviews and testimonials")
      .getByRole("button", { name: "Send" });
  });

  setToLogOutState();

  test("Send button should notify you to log in", async ({ page }) => {
    await sendButton.click();

    await expect(notificationPopUp).toBeVisible();
  });

  test("Text Notification click should navigate to login page", async ({
    page,
  }) => {
    await sendButton.click();
    await page.getByText("go to login page").click();

    expect(page.url()).toContain("/login");
  });

  test("Backdrop click should close notification pop up", async ({ page }) => {
    await sendButton.click();
    await page.locator("#root").click({ position: { x: 5, y: 5 } });

    await expect(notificationPopUp).toBeHidden();
  });
});
