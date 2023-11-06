// @ts-check
import { expect, test } from "@playwright/test";

import user from "../../../mockDatas/user.json";

test.beforeEach(async ({ page }) => {
  await page.route(`/api/user/getUserData`, async (route) => {
    await route.fulfill({ json: user });
  });
  await page.goto("/account");
});

test.describe("Non-edit state", () => {
  test.beforeEach(async ({ page }) => {
    await page.route(`/api/auth/withID`, async (route) => {
      route.fulfill({
        body: "Invalid Id or Password",
        contentType: "text/plain",
        status: 400,
      });
    });
  });

  test("Password field should be empty", async ({ page }) => {
    const passwordField = page.getByLabel("Password :");

    await expect(passwordField).toBeEmpty();
  });

  test("Input fields should be readonly", async ({ page }) => {
    //mobile field is using disabled instead of readonly because it is from
    //third party package
    const inputFields = page.locator(".my-details__input");
    const mobileNoField = page.getByPlaceholder("Mobile No.");

    for (let inputField of await inputFields.all())
      await expect(inputField).toHaveAttribute("readOnly");
    await expect(mobileNoField).toBeDisabled();
  });

  test.describe("Password prompt", () => {
    let passwordPrompt, submitButton, passwordInput;
    test.beforeEach(async ({ page }) => {
      passwordInput = page.getByLabel("Enter your password:");
      passwordPrompt = page.getByRole("dialog");
      submitButton = page.getByRole("button", { name: "Submit" });

      await page.getByRole("button", { name: "Edit" }).click();
    });

    test("Edit button click should open a password prompt", async () => {
      await expect(passwordPrompt).toBeVisible();
    });

    test("Password prompt backdrop click should close prompt", async ({
      page,
    }) => {
      await page.locator("#root").click({ position: { x: 5, y: 5 } });

      await expect(passwordPrompt).toBeHidden();
    });

    test("Error should appear if password is invalid", async ({ page }) => {
      const error = page.getByText("must be at least");

      await submitButton.click();

      await expect(error).toHaveCount(1);
    });

    test("Error should appear if password is incorrect", async ({ page }) => {
      const error = page.getByText("Invalid Id or Password");

      await passwordInput.fill("incorrectpassword");
      await submitButton.click();

      await expect(error).toHaveCount(1);
    });

    test("Password input should be empty or reset on invalid submission", async () => {
      await passwordInput.fill("incorrectpassword");
      await submitButton.click();

      await expect(passwordInput).toBeEmpty();
    });
  });
});

test.describe("Edit state", () => {
  let editButton, mobileNoField, saveButton;
  test.beforeEach(async ({ page }) => {
    await page.route(`/api/auth/withID`, async (route) => {
      route.fulfill({
        json: "Valid Password",
      });
    });

    editButton = page.getByRole("button", { name: "Edit" });
    mobileNoField = page.getByPlaceholder("Mobile No.");
    saveButton = page.getByRole("button", { name: "Save" });

    await editButton.click();
    await page.getByLabel("Enter your password:").fill("correctpassword");
    await page.getByRole("button", { name: "Submit" }).click();
  });

  test("Correct password should close prompt and open edit mode", async ({
    page,
  }) => {
    const passwordPrompt = page.getByRole("dialog");

    await expect(passwordPrompt).toBeHidden();
    await expect(editButton).toBeHidden();
    await expect(saveButton).toBeVisible();
  });

  test("Password field should be filled", async ({ page }) => {
    const passwordField = page.getByLabel("Password :");

    await expect(passwordField).not.toBeEmpty();
  });

  test("Input fields should be editable", async ({ page }) => {
    const inputFields = page.locator(".my-details__input");

    for (let inputField of await inputFields.all())
      await expect(inputField).not.toHaveAttribute("readOnly");
    await expect(mobileNoField).not.toBeDisabled();
  });

  test("Cancel button should close Edit mode and reset modifcations", async ({
    page,
  }) => {
    const unmodifiedMobileNo = await mobileNoField.inputValue();
    const cancelButton = page.getByRole("button", { name: "Cancel" });

    await mobileNoField.fill("");
    await saveButton.click(); //save and show error
    await cancelButton.click();

    await expect(mobileNoField).toHaveValue(unmodifiedMobileNo);
    await expect(cancelButton).toBeHidden();
    await expect(saveButton).toBeHidden();
    await expect(editButton).toBeVisible();
  });

  test("Input fields should show errors if invalid or empty", async ({
    page,
  }) => {
    const inputFields = page.locator(".my-details__input");
    const errors = page
      .getByText("is a required field")
      .or(page.getByText("must be a valid"))
      .or(page.getByText("must be at least"));

    for (let inputField of await inputFields.all()) await inputField.fill("");
    await mobileNoField.fill("");
    await saveButton.click();

    await expect(errors).toHaveCount(5);
  });

  test("Request failure due to server fault should show error", async ({
    page,
  }) => {
    const newMobileNo = user.mobileNo.replace("5", "8");
    const error = page.getByText("Request failed");

    await page.getByLabel("Mobile No. :").fill(newMobileNo);
    await saveButton.click();

    await expect(error).toHaveCount(1);
  });

  test("Invalid field errors disable save button", async () => {
    await mobileNoField.fill("");
    await saveButton.click();

    await expect(saveButton).toBeDisabled();
  });

  test("Saving without modification should close edit mode", async () => {
    await saveButton.click();

    await expect(saveButton).toBeHidden();
    await expect(editButton).toBeVisible();
  });

  test("Succesful saving should modify input fields", async ({ page }) => {
    const firstNameModification = "Changed";
    const firstNameField = page.getByLabel("First Name :");
    await page.route(`/api/user/updateUserData`, async (route) => {
      route.fulfill({
        json: {
          ...user,
          firstName: firstNameModification,
        },
      });
    });

    await firstNameField.fill(firstNameModification);
    await saveButton.click();

    await expect(firstNameField).toHaveValue(firstNameModification);
  });
});
