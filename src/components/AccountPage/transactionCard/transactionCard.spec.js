// @ts-check
import { expect, test } from "@playwright/test";

import transaction from "../../../mockDatas/transaction.json";
import user from "../../../mockDatas/user.json";

test.beforeEach(async ({ page }) => {
  await page.route(`/api/user/getUserData`, async (route) => {
    await route.fulfill({ json: user });
  });
  await page.route(
    `/api/bookTransactions/getUserTransactions?*`,
    async (route) => {
      await route.fulfill({ json: [transaction] });
    }
  );

  await page.goto("/account");
  await page
    .getByLabel("table of contents")
    .getByText("My Transaction")
    .click();
});

test.describe("Image Viewer and Show Image Button", () => {
  let imageViewer;
  test.beforeEach(async ({ page }) => {
    imageViewer = page.getByRole("dialog");

    await page.getByRole("button", { name: "Show Image/s" }).first().click();
  });

  test("Show Image button click should open image viewer", async () => {
    await expect(imageViewer).toBeVisible();
  });

  test("Image Viewer backdrop click should close Image Viewer", async ({
    page,
  }) => {
    await page.locator("#root").click({ position: { x: 5, y: 5 } });

    await expect(imageViewer).toBeHidden();
  });
});

test.describe("Prompt and Status Button", () => {
  let statusChangePrompt;
  test.beforeEach(async ({ page }) => {
    statusChangePrompt = page.getByRole("dialog");

    await page.route(
      `/api/bookTransactions/updateTransactionStatus`,
      async (route) => {
        await route.fulfill({ json: "Update successful" });
      }
    );
    await page.getByRole("button", { name: "Change Status" }).first().click();
  });

  test("Change Status button click should open a prompt", async () => {
    await expect(statusChangePrompt).toBeVisible();
  });

  test("No button click should abort status change and close prompt", async ({
    page,
  }) => {
    await page.getByRole("button", { name: "No" }).click();

    await expect(statusChangePrompt).toBeHidden();
  });

  test("Yes button click should change status", async ({ page }) => {
    const newStatus = "PENDING";
    const statusField = page.locator(".transaction-card__field-value").nth(5);
    const yesButton = page.getByRole("button", { name: "Yes" });

    await yesButton.click();

    await expect(statusField).toContainText(newStatus);
    await expect(statusChangePrompt).toBeHidden();
  });

  test("Status should revert to old status if status change request failed", async ({
    page,
  }) => {
    const oldStatus = "AVAILABLE";
    const statusField = page.locator(".transaction-card__field-value").nth(5);
    const yesButton = page.getByRole("button", { name: "Yes" });

    await page.route(
      `/api/bookTransactions/updateTransactionStatus`,
      async (route) => {
        await route.abort();
      }
    );
    await yesButton.click();

    await expect(statusField).toContainText(oldStatus);
    await expect(statusChangePrompt).toBeHidden();
  });
});

test.describe("Prompt and Close Button", () => {
  let deletePrompt;
  test.beforeEach(async ({ page }) => {
    deletePrompt = page.getByRole("dialog");

    await page.route(
      `/api/bookTransactions/deleteTransaction/*`,
      async (route) => {
        await route.fulfill({ json: "Deletion successful" });
      }
    );
    await page.getByText("+").first().click();
  });

  test("Transaction card close button click should open prompt", async () => {
    await expect(deletePrompt).toBeVisible();
  });

  test("No button click should abort delete request and close prompt", async ({
    page,
  }) => {
    await page.getByRole("button", { name: "No" }).click();

    await expect(deletePrompt).toBeHidden();
  });

  test("Yes button click should delete transaction", async ({ page }) => {
    const transactionCards = page.locator(".transaction-card");

    await page.getByRole("button", { name: "Yes" }).click();

    await expect(deletePrompt).toBeHidden();
    await expect(transactionCards).toHaveCount(0);
  });

  test("Transaction Card deleted should be restored if deletion request failed", async ({
    page,
  }) => {
    const transactionCards = page.locator(".transaction-card");

    await page.route(
      `/api/bookTransactions/deleteTransaction/*`,
      async (route) => {
        await route.abort();
      }
    );
    await page.getByRole("button", { name: "Yes" }).click();

    await expect(deletePrompt).toBeHidden();
    await expect(transactionCards).toHaveCount(1);
  });
});
