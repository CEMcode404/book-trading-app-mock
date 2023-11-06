// @ts-check
import { expect, test } from "@playwright/test";
import path from "path";

import searchBooks from "../../../mockDatas/books.json";
import user from "../../../mockDatas/user.json";
import transaction from "../../../mockDatas/transaction.json";

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
  await page.locator(".my-transaction__add-bttn-wrapper").click();
});

test.describe("Form Closing ", () => {
  let form;
  test.beforeEach(async ({ page }) => {
    form = page.getByRole("dialog");
  });

  test("Form backdrop click should close form", async ({ page }) => {
    await page.locator("#root").click({ position: { x: 5, y: 5 } });

    await expect(form).toBeHidden();
  });

  test("Cancel button click should close form", async ({ page }) => {
    await page.getByRole("button", { name: "Cancel" }).click();

    await expect(form).toBeHidden();
  });
});

test.describe("Input Fields Error Messages", () => {
  let errors;
  test.beforeEach(async ({ page }) => {
    errors = page
      .getByText("is a required field")
      .or(page.getByText("specify a number"))
      .or(page.getByText("minimum 2 image"));

    await page.getByRole("button", { name: "Submit" }).click();
  });

  test("Input fields should show error if form inputs are invalid or empty", async () => {
    await expect(errors).toHaveCount(6);
  });

  test("Closing form should clear errors ", async ({ page }) => {
    await page.getByRole("button", { name: "Cancel" }).click();
    await page.locator(".my-transaction__add-bttn-wrapper").click();

    await expect(errors).toHaveCount(0);
  });
});

test.describe("Author field", () => {
  let addButton, authorField, listItems;
  test.beforeEach(async ({ page }) => {
    addButton = page.getByRole("button", { name: "Add" });
    authorField = page.getByLabel("Author/s:");
    listItems = page.locator(".input-with-list__list-item");
  });

  test("Space, tab or empty input should not be added to the list", async () => {
    await authorField.fill("   ");
    await addButton.click();

    await expect(listItems).toHaveCount(0);
  });

  test("Valid input should add item to the list", async () => {
    await authorField.fill("Johnny Test");
    await addButton.click();

    await expect(listItems).toHaveCount(1);
  });

  test("List item click should remove item that is click", async () => {
    await authorField.fill("Johnny Test");
    await addButton.click();
    await listItems.first().click();

    await expect(listItems).toHaveCount(0);
  });
});

const imgWithValidFormat = path.join(
  __dirname,
  "../../../assets/sampleImg-100.jpg"
);
const imgWithInvalidFormat = path.join(
  __dirname,
  "../../../assets/book-no-image.svg"
);

test.describe("File Uploader", () => {
  let fileUploader, submitButton;
  test.beforeEach(async ({ page }) => {
    submitButton = page.getByRole("button", { name: "Submit" });
    fileUploader = page.locator("input[type=file]");
  });

  test("File Uploader should give error if images are less than minimum allowed images", async ({
    page,
  }) => {
    const error = page.getByText("minimum 2 image");

    await fileUploader.setInputFiles(imgWithValidFormat);
    await submitButton.click();

    await expect(error).toHaveCount(1);
  });

  test("File Uploader should give error if images are more than maximum allowed images", async ({
    page,
  }) => {
    const error = page.getByText("Exceeded 2 image limit");

    await fileUploader.setInputFiles([
      imgWithValidFormat,
      imgWithValidFormat,
      imgWithValidFormat,
    ]);
    await submitButton.click();

    await expect(error).toHaveCount(1);
  });

  test("File Uploader should give error if images are invalid format", async ({
    page,
  }) => {
    const error = page.getByText("Invalid Images");

    await fileUploader.setInputFiles([
      imgWithInvalidFormat,
      imgWithInvalidFormat,
    ]);
    await submitButton.click();

    await expect(error).toHaveCount(1);
  });

  test("File Uploader should not give error if image and image number are valid", async ({
    page,
  }) => {
    const error = page
      .getByText("Invalid Images")
      .or(page.getByText("Exceeded 2 image limit"))
      .or(page.getByText("minimum 2 image"));

    await fileUploader.setInputFiles([imgWithValidFormat, imgWithValidFormat]);
    await submitButton.click();

    await expect(error).toHaveCount(0);
  });

  test("Clear Images button click should clear images selected", async ({
    page,
  }) => {
    const imagesDisplayed = page
      .locator(".image-uploader__preview")
      .locator("img");

    await fileUploader.setInputFiles([imgWithValidFormat, imgWithValidFormat]);
    await page.getByRole("button", { name: "Clear Images" }).click();

    await expect(imagesDisplayed).toHaveCount(0);
  });
});

test.describe("Succesfull Submission resets the form", () => {
  test.beforeEach(async ({ page }) => {
    await page.route(
      `/api/bookTransactions/createTransaction`,
      async (route) => {
        await route.fulfill({
          json: { ...transaction, _id: "6552e37808a39b65c6d55555" },
        });
      }
    );
    await page.route(`/api/books/*`, async (route) => {
      await route.fulfill({ json: searchBooks });
    });

    //Fill up the form
    await page.getByLabel("Title:").fill("Webster");
    await page.getByLabel("Author/s:").fill("John Wick");
    await page.getByRole("button", { name: "Add" }).click();
    await page.getByLabel("Price:").fill("10");
    await page.getByLabel("Use Duration:").fill("10");
    await page.getByPlaceholder("Find ISBN by title").fill("react");
    await page.locator(".isbn-search-result-card").first().click();
    await page
      .locator("input[type=file]")
      .setInputFiles([imgWithValidFormat, imgWithValidFormat]);

    //Submit and open form again
    await page.getByRole("button", { name: "Submit" }).click();
    await page.locator(".my-transaction__add-bttn-wrapper").click();
  });

  test("Form should not have error messages", async ({ page }) => {
    const errors = page
      .getByText("Invalid Images")
      .or(page.getByText("Exceeded 2 image limit"))
      .or(page.getByText("minimum 2 image"));

    await expect(errors).toHaveCount(0);
  });

  test("Form input fields shoud be empty", async ({ page }) => {
    for (let inputFields of await page
      .getByRole("dialog")
      .locator("input[type=text]")
      .all())
      await expect(inputFields).toHaveValue("");
  });

  test("Form author field should have an empty list", async ({ page }) => {
    await expect(page.locator(".input-with-list__list-item")).toHaveCount(0);
  });

  test("Form should not have the previously selected ISBN card displayed", async ({
    page,
  }) => {
    await expect(page.locator(".isbn-input__selected-isbn-card")).toBeHidden();
  });

  test("Form file uploader should be clear of images", async ({ page }) => {
    await expect(
      page.locator(".image-uploader__preview").locator("img")
    ).toHaveCount(0);
  });
});
