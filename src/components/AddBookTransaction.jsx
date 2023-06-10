import React, {
  forwardRef,
  useContext,
  useImperativeHandle,
  useRef,
} from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import bookLoading from "../assets/bookLoading.gif";
import ImageUploader from "./common/ImageUploader.jsx";
import getISBNrules from "../utility/getISBNrules.js";
import { UserContext } from "./context/userContext";
import IsbnInput from "./common/IsbnInput.jsx";

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
    message = "Invalid Images",
    allowedExtensions = ["png", "jpg", "jpeg"],
    maxByteSize = 5000000,
    maxImageLimit = 2,
    required = false,
  } = options;
  return this.test("areImagesValid", message, function (images) {
    const { path, createError } = this;
    if (required && images.length < 1)
      return createError({ path, message: `Image/s required` });

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
    isbn: yup.string().isValidISBN().required().label("ISBN"),
    images: yup
      .mixed()
      .areImagesValid({ required: true })
      .required()
      .label("Images"),
  })
  .required();

const AddBookTransaction = forwardRef(function AddBookTransaction(
  { onSubmitHookFunc },
  ref
) {
  const {
    setValue,
    reset,
    clearErrors,
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: yupResolver(schema) });

  const { user } = useContext(UserContext);
  const dialogRef = useRef();
  const imgUploaderRef = useRef();

  function handleClosePrompt(e) {
    const dialogElement = dialogRef.current;
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

  function handleClearImagesHook() {
    setValue("images", []);
  }

  const onSubmit = (data) => {
    const { firstName, lastName } = user;
    data.status = false;
    data.owner = `${firstName} ${lastName}`;
    imgUploaderRef.current.getBase64Imgs((img) => {
      data.images = img;
      onSubmitHookFunc(data);
      reset();
      imgUploaderRef.current.clearImagesPreview();
    });
    dialogRef.current.close();
  };

  const handleOpenForm = () => {
    dialogRef.current.showModal();
  };

  useImperativeHandle(
    ref,
    () => {
      return {
        openForm: handleOpenForm,
      };
    },
    []
  );

  return (
    <dialog
      ref={dialogRef}
      onClick={handleClosePrompt}
      className="my-transaction__add-book-dialog"
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="my-transaction__field-wrapper">
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
        <div className="my-transaction__field-wrapper">
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
        <div className="my-transaction__field-wrapper">
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
        <div className="my-transaction__field-wrapper">
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
        <div className="my-transaction__field-wrapper">
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
        <div className="my-transaction__field-wrapper">
          <label
            className="my-transaction__form-label"
            htmlFor="my-transaction__isbn-id"
          >
            ISBN:
          </label>
          <div className="my-transaction__isbn-input-wrapper">
            <IsbnInput
              disabled={isSubmitting}
              register={register}
              setValue={setValue}
              clearErrors={clearErrors}
              id={"my-transaction__isbn-id"}
            />
          </div>
          <p className="my-transaction__p--error">{errors.isbn?.message}</p>
        </div>
        <div className="my-transaction__field-wrapper">
          <ImageUploader
            openDialog={handleOpenForm}
            closeDialog={() => dialogRef?.current?.close()}
            ref={imgUploaderRef}
            disabled={isSubmitting}
            id={"my-transaction__img-uploader"}
            register={register}
            name="images"
            maxImages={2}
            maxByteSize={5000000}
            clearImagesHook={handleClearImagesHook}
          />
          <p className="my-transaction__p--error--img">
            {errors.images?.message}
          </p>
        </div>

        <img
          className={
            isSubmitting
              ? "my-transaction__loading-gif"
              : "my-transaction__loading-gif--hide"
          }
          src={bookLoading}
          alt="loading..."
        />

        <div className="my-transaction__submit-and-cancel-bttn-wrappers">
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
        </div>
      </form>
    </dialog>
  );
});

export default AddBookTransaction;
