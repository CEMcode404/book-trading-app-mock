import { NavLink } from "react-router-dom";
import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import Dialog from "../../commonComponents/Dialog.jsx";

import { UserContext } from "../../contexts/userContext.js";
import "./reviewForm.scss";

const schema = yup
  .object({
    message: yup.string().max(1000).label("Message").required(),
    stars: yup.number().lessThan(6).moreThan(0).required(),
  })
  .required();

const ReviewForm = () => {
  const {
    formState: { errors, isSubmitting },
    handleSubmit,
    reset,
    register,
  } = useForm({ resolver: yupResolver(schema) });

  const [isReviewFormOpen, setIsReviewFormOpen] = useState(false);
  const { user } = useContext(UserContext);

  return (
    <div className="review-form__wrapper">
      <form className="review-form" onSubmit={handleSubmit(() => reset())}>
        <textarea
          className="review-form__textarea"
          disabled={isSubmitting}
          {...register("message")}
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
              className="review-form__submit-bttn bttn--slide-up--green"
              disabled={isSubmitting}
              type="submit"
              value="Send"
            />
          )}

          {!user && (
            <input
              className="review-form__submit-bttn--redirect-to-login bttn--slide-up--green"
              disabled={isSubmitting}
              onClick={() => setIsReviewFormOpen(true)}
              type="button"
              value="Send"
            />
          )}
          <p className="review-form__errors">{errors.message?.message}</p>
        </div>
      </form>

      <Dialog
        backDropClickCallBack={() => setIsReviewFormOpen(false)}
        className="review-form__goto-login-prompt"
        isOpen={isReviewFormOpen}
      >
        <div>
          <p>
            This action requires login...
            <NavLink className="review-form__navlink" to="/login">
              go to login page
            </NavLink>
          </p>
        </div>
      </Dialog>
    </div>
  );
};

export default ReviewForm;
