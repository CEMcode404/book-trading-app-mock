import React, { useContext, useRef } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { UserContext } from "../context/userContext";
import { NavLink } from "react-router-dom";

const schema = yup
  .object({
    message: yup.string().max(1000).label("Message").required(),
    stars: yup.number().lessThan(6).moreThan(0).required(),
  })
  .required();

const ReviewForm = () => {
  const {
    reset,
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = (data) => {
    reset();
  };

  const { user } = useContext(UserContext);
  const gotoDialogRef = useRef();

  function handleClosePrompt(e) {
    const dialogElement = gotoDialogRef.current;
    const dialogDimensions = dialogElement.getBoundingClientRect();
    if (
      e.clientY < dialogDimensions.top ||
      e.clientY > dialogDimensions.bottom ||
      e.clientX < dialogDimensions.left ||
      e.clientX > dialogDimensions.right
    ) {
      dialogElement.close();
    }
  }

  const onSubmitRedirect = () => {
    const dialogElement = gotoDialogRef.current;
    dialogElement.showModal();
  };

  return (
    <div className="review-form__wrapper">
      <form className="review-form" onSubmit={handleSubmit(onSubmit)}>
        <textarea
          className="review-form__textarea"
          {...register("message")}
          disabled={isSubmitting}
        ></textarea>
        <label className="review-form__stars">
          Rate:
          <select {...register("stars")} disabled={isSubmitting}>
            <option value={5}>5 stars</option>
            <option value={4}>4 stars</option>
            <option value={3}>3 stars</option>
            <option value={2}>2 stars</option>
            <option value={1}>1 star</option>
          </select>
        </label>
        <div>
          {user && (
            <input
              type="submit"
              value="Send"
              className="review-form__submit bttn--slide-up--green"
              disabled={isSubmitting}
            />
          )}
          {!user && (
            <input
              type="button"
              value="Send"
              className="review-form__redirect-login bttn--slide-up--green"
              onClick={onSubmitRedirect}
              disabled={isSubmitting}
            />
          )}
          <p className="review-form__errors">{errors.message?.message}</p>
        </div>
      </form>
      <dialog
        className="review-form__goto-login-prompt"
        ref={gotoDialogRef}
        onClick={handleClosePrompt}
      >
        <div>
          <p>
            This action requires login...
            <NavLink className="review-form__navlink" to="/login">
              go to login page
            </NavLink>
          </p>
        </div>
      </dialog>
    </div>
  );
};

export default ReviewForm;
