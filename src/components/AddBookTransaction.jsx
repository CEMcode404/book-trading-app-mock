import React, { forwardRef } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import bookLoading from "../assets/bookLoading.gif";
import ImageUploader from "./common/ImageUploader.jsx";

const schema = yup
  .object({
    title: yup.string().max(256).required().label("Title"),
    authors: yup.string().max(256).required().label("Author/s"),
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
    isbn: yup.string().max(13).label("ISBN"),
  })
  .required();

const AddBookTransaction = forwardRef(function AddBookTransaction(
  { onSubmitHookFunc },
  ref
) {
  const {
    reset,
    clearErrors,
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: yupResolver(schema) });

  function handleClosePrompt(e) {
    const dialogElement = ref.current;
    const dialogDimensions = dialogElement.getBoundingClientRect();
    if (isSubmitting) return;
    if (
      e.clientY < dialogDimensions.top ||
      e.clientY > dialogDimensions.bottom ||
      e.clientX < dialogDimensions.left ||
      e.clientX > dialogDimensions.right
    ) {
      clearErrors();
      dialogElement.close();
      return;
    }

    if (e.target.className.indexOf("my-transaction__cancel-bttn") > -1) {
      clearErrors();
      dialogElement.close();
    }
  }

  const onSubmit = async (data) => {
    console.log(data);
    await onSubmitHookFunc(data);
    reset({
      title: "",
      authors: "",
      price: "",
      useDuration: "",
      isbn: "",
      images: "",
    });
    ref.current.close();
  };

  return (
    <dialog
      ref={ref}
      onClick={handleClosePrompt}
      className="my-transaction__add-book-dialog"
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="my-transaction__fied-wrapper">
          <label
            className="my-transaction__form-label"
            htmlFor="my-transaction__title-id"
          >
            Title:
          </label>
          <input
            type="text"
            id="my-transaction__title-id"
            {...register("title")}
            placeholder="Meriam-Webster"
            disabled={isSubmitting}
          />
          <p className="my-transaction__p--error">{errors.title?.message}</p>
        </div>
        <div className="my-transaction__fied-wrapper">
          <label
            className="my-transaction__form-label"
            htmlFor="my-transaction__author-id"
          >
            Author/s:
          </label>
          <input
            type="text"
            id="my-transaction__author-id"
            {...register("authors")}
            placeholder="George Meriam/Charles Merriam"
            disabled={isSubmitting}
          />
          <p className="my-transaction__p--error">{errors.authors?.message}</p>
        </div>
        <div className="my-transaction__fied-wrapper">
          <label
            className="my-transaction__form-label"
            htmlFor="my-transaction__price-id"
          >
            Price:
          </label>
          <select
            className="my-transaction__currency-select"
            {...register("currency")}
            disabled={isSubmitting}
          >
            <option>₱</option>
            <option>$</option>
          </select>
          <input
            type="text"
            id="my-transaction__price-id"
            {...register("price")}
            placeholder="50"
            disabled={isSubmitting}
          />
          <p className="my-transaction__p--error">{errors.price?.message}</p>
        </div>
        <div className="my-transaction__fied-wrapper">
          <label
            className="my-transaction__form-label"
            htmlFor="my-transaction__book-condition"
          >
            Book Condition:
          </label>
          <select
            id="my-transaction__book-condition"
            {...register("bookCondition")}
            disabled={isSubmitting}
          >
            <option>Used</option>
            <option>New</option>
          </select>
        </div>
        <div className="my-transaction__fied-wrapper">
          <label
            className="my-transaction__form-label"
            htmlFor="my-transaction__use-duration-id"
          >
            Use Duration:
          </label>
          <input
            type="text"
            id="my-transaction__use-duration-id"
            {...register("useDuration")}
            placeholder="1"
            disabled={isSubmitting}
          />
          <select
            className="my-transaction__duration-select"
            {...register("timeUnit")}
            disabled={isSubmitting}
          >
            <option>Month/s</option>
            <option>Day/s</option>
            <option>Year/s</option>
          </select>
          <p className="my-transaction__p--error">
            {errors.useDuration?.message}
          </p>
        </div>
        <div className="my-transaction__fied-wrapper">
          <label
            className="my-transaction__form-label"
            htmlFor="my-transaction__isbn-id"
          >
            ISBN(optional):
          </label>
          <input
            type="text"
            id="my-transaction__isbn-id"
            {...register("isbn")}
            placeholder="9780877799306"
            disabled={isSubmitting}
          />
          <p className="my-transaction__p--error">{errors.isbn?.message}</p>
        </div>
        <ImageUploader
          ref={ref}
          disabled={isSubmitting}
          id={"my-transaction__img-uploader"}
          register={register}
          name="images"
          maxImages={2}
          maxByteSize={5000000}
        />
        <img
          className={
            isSubmitting
              ? "my-transaction__loading-gif"
              : "my-transaction__loading-gif--hide"
          }
          src={bookLoading}
          alt="loading..."
        />
        <input
          type="submit"
          className="my-transaction__submit-bttn bttn--slide-up--green"
          disabled={isSubmitting}
        />
        <input
          type="button"
          className="my-transaction__cancel-bttn bttn--slide-up--gray"
          disabled={isSubmitting}
          value="Cancel"
          onClick={handleClosePrompt}
        />
      </form>
    </dialog>
  );
});

export default AddBookTransaction;
