import PropTypes from "prop-types";
import React, { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import BookTransactionFormFieldLabel from "../bookTransactionFormField/BookTransactionFormFieldLabel.jsx";
import Dialog from "../../commonComponents/Dialog.jsx";
import IsbnInput from "../isbnInput/IsbnInput.jsx";
import ImageUploader from "../../commonComponents/imageUploader/ImageUploader.jsx";
import InputWithList from "../../commonComponents/inputWithList/InputWithList.jsx";
import LoadingIcon from "../../commonComponents/loadingIcon/LoadingIcon.jsx";

import getISBNrules from "./getISBNrules.js";
import "./addBookTransaction.scss";

const AddBookTransaction = ({
  isOpen = false,
  onSubmit: externalOnSubmitHook,
  onClose: closeBookTransactionForm,
}) => {
  const {
    clearErrors,
    formState: { errors, isSubmitting },
    handleSubmit,
    reset,
    register,
    setValue,
    trigger,
  } = useForm({ resolver: yupResolver(schema) });

  const authorListRef = useRef();
  const isbnInputRef = useRef();
  const imgUploaderRef = useRef();

  //registered inputWithList and isbnInput component to react-hook-form here instead of inline because I can't direclty register
  //them to react-hook-form without coupling them to this element causing it to become unreusable component

  useEffect(() => {
    register("authors");
    register("isbn");
  }, []);

  useEffect(() => {
    if (isOpen) clearErrors();
  }, [isOpen]);

  async function handleAuthorListUpdate(list) {
    setValue("authors", [...list]);
    await trigger("authors");
  }

  async function handleIsbnUpdate(isbn) {
    setValue("isbn", isbn);
    await trigger("isbn");
  }

  function handleSwitchIsbnSelectType() {
    setValue("isbn", "");
    clearErrors(["isbn"]);
  }

  function handleCloseBookTransactionForm() {
    if (isSubmitting) return;

    clearErrors();
    closeBookTransactionForm();
  }

  function onSubmitBookTransactionForm(data) {
    data.status = "AVAILABLE";

    let formData = new FormData();
    for (let key in data) {
      if (key === "authors")
        for (const value of data[key]) formData.append(key, value);
      else if (key === "images") continue;
      else formData.append(key, data[key]);
    }

    //separated and appended images last to send it last
    //to the server and validate txt field first
    for (const image of data.images) formData.append("images", image);

    //execute external on submit handler
    externalOnSubmitHook(formData);

    cleanUp();
    handleCloseBookTransactionForm();
  }

  function cleanUp() {
    reset();
    imgUploaderRef.current.clearImagesPreview();
    authorListRef.current.clearList();
    isbnInputRef.current.reset();
  }

  return (
    <Dialog
      backDropClickCallBack={handleCloseBookTransactionForm}
      className="add-book-transaction__dialog"
      isOpen={isOpen}
    >
      <form onSubmit={handleSubmit(onSubmitBookTransactionForm)}>
        <BookTransactionFormFieldLabel
          htmlFor="add-book-transaction__title"
          label="Title"
        >
          <div>
            <input
              disabled={isSubmitting}
              id="add-book-transaction__title"
              placeholder="Meriam-Webster"
              type="text"
              {...register("title")}
            />
            <p className="add-book-transaction__errors">
              {errors.title?.message}
            </p>
          </div>
        </BookTransactionFormFieldLabel>

        <BookTransactionFormFieldLabel
          htmlFor="add-book-transaction__author"
          label="Author/s"
        >
          <div>
            <InputWithList
              disabled={isSubmitting}
              id="add-book-transaction__author"
              ref={authorListRef}
              onListUpdateCallback={handleAuthorListUpdate}
            />
            <p className="add-book-transaction__errors">
              {errors.authors?.message}
            </p>
          </div>
        </BookTransactionFormFieldLabel>

        <BookTransactionFormFieldLabel
          htmlFor="add-book-transaction__price"
          label="Price"
        >
          <div>
            <select
              className="add-book-transaction__select-currency"
              disabled={isSubmitting}
              {...register("currency")}
            >
              <option>₱</option>
              <option>$</option>
            </select>
            <input
              disabled={isSubmitting}
              id="add-book-transaction__price"
              placeholder="50"
              type="text"
              {...register("price")}
            />
            <p className="add-book-transaction__errors">
              {errors.price?.message}
            </p>
          </div>
        </BookTransactionFormFieldLabel>

        <BookTransactionFormFieldLabel
          htmlFor="add-book-transaction__book-condition"
          label="Book Condition"
        >
          <select
            disabled={isSubmitting}
            id="add-book-transaction__book-condition"
            {...register("bookCondition")}
          >
            <option>Used</option>
            <option>New</option>
          </select>
        </BookTransactionFormFieldLabel>

        <BookTransactionFormFieldLabel
          htmlFor="add-book-transaction__use-duration"
          label="Use Duration"
        >
          <div>
            <input
              disabled={isSubmitting}
              id="add-book-transaction__use-duration"
              placeholder="1"
              type="text"
              {...register("useDuration")}
            />
            <select
              className="add-book-transaction__select-duration"
              disabled={isSubmitting}
              {...register("timeUnit")}
            >
              <option>Month/s</option>
              <option>Day/s</option>
              <option>Year/s</option>
            </select>
            <p className="add-book-transaction__errors">
              {errors.useDuration?.message}
            </p>
          </div>
        </BookTransactionFormFieldLabel>

        <BookTransactionFormFieldLabel
          className="add-book-transaction__isbn"
          htmlFor="add-book-transaction__isbn"
          label="ISBN"
        >
          <div>
            <div className="add-book-transaction__isbn-input-wrapper">
              <IsbnInput
                disabled={isSubmitting}
                id={"add-book-transaction__isbn"}
                onChange={handleIsbnUpdate}
                onSelectType={handleSwitchIsbnSelectType}
                ref={isbnInputRef}
              />
            </div>
            <p className="add-book-transaction__errors">
              {errors.isbn?.message}
            </p>
          </div>
        </BookTransactionFormFieldLabel>

        <ImageUploader
          disabled={isSubmitting}
          id={"add-book-transaction__img-uploader"}
          name="images"
          onClearImages={() => setValue("images", [])}
          ref={imgUploaderRef}
          register={register}
        />
        <p className="add-book-transaction__errors--img">
          {errors.images?.message}
        </p>

        <LoadingIcon isVisible={isSubmitting} />

        <div className="add-book-transaction__submit-and-cancel-bttn-wrapper">
          <input
            className="add-book-transaction__submit-bttn bttn--slide-up--green"
            disabled={isSubmitting}
            type="submit"
          />
          <input
            className="add-book-transaction__cancel-bttn bttn--slide-up--gray"
            disabled={isSubmitting}
            onClick={handleCloseBookTransactionForm}
            type="button"
            value="Cancel"
          />
        </div>
      </form>
    </Dialog>
  );
};

yup.addMethod(
  yup.string,
  "isValidISBN",
  function (options = { message: "Invalid ISBN" }) {
    const { message } = options;

    return this.test("isValidISBN", message, function (value) {
      const { path, createError } = this;

      if (value === "") return true;

      const isValidISBN = yup
        .string()
        .matches(getISBNrules())
        .isValidSync(value);

      if (!isValidISBN) return createError({ path, message });

      return true;
    });
  }
);

yup.addMethod(yup.mixed, "areImagesValid", function (options = {}) {
  const {
    //defaults
    message = "Invalid Images",
    allowedExtensions = ["png", "jpg", "jpeg"],
    maxByteSize = 2 * 1000 * 1000,
    maxImageLimit = 2,
    minImageLimit = 2,
    required = false,
  } = options;

  return this.test("areImagesValid", message, function (images) {
    const { path, createError } = this;

    if (required && images.length < minImageLimit)
      return createError({
        path,
        message: `Failed to meet minimum ${minImageLimit} image limit`,
      });

    if (images.length > maxImageLimit)
      return createError({
        path,
        message: `Exceeded ${maxImageLimit} image limit`,
      });

    for (let i = 0; i < images.length; i++) {
      if (images[i].size > maxByteSize)
        return createError({
          path,
          message: `Exceeded ${maxByteSize} bytes limit`,
        });

      const imageExtension = images[i].name.split(".").pop();
      if (!allowedExtensions.includes(imageExtension))
        return createError({ path, message });
    }

    return true;
  });
});

const schema = yup
  .object({
    title: yup.string().max(256).required().label("Title"),
    authors: yup
      .array()
      .of(yup.string().min(1).max(256).label("Author"))
      .min(1)
      .required()
      .label("Authors"),
    price: yup
      .number()
      .typeError("You must specify a number")
      .lessThan(10000)
      .positive()
      .integer()
      .required()
      .label("Price"),
    useDuration: yup
      .number()
      .typeError("You must specify a number")
      .lessThan(1000)
      .positive()
      .integer()
      .required()
      .label("Use Duration"),
    isbn: yup.string().isValidISBN().required().label("ISBN"),
    images: yup.mixed().areImagesValid({ required: true }).label("Images"),
  })
  .required();

AddBookTransaction.propTypes = {
  isOpen: PropTypes.bool,
  onSubmit: PropTypes.func,
  onClose: PropTypes.func.isRequired,
};

export default AddBookTransaction;
