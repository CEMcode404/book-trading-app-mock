import React from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";

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
    console.log(data);
    reset();
  };

  return (
    <div className="review-form__wrapper">
      <form className="review-form" onSubmit={handleSubmit(onSubmit)}>
        <textarea
          className="review-form__textarea"
          {...register("message")}
        ></textarea>
        <label className="review-form__stars">
          Rate:
          <select {...register("stars")}>
            <option value={1}>1 star</option>
            <option value={2}>2 stars</option>
            <option value={3}>3 stars</option>
            <option value={4}>4 stars</option>
            <option value={5} selected>
              5 stars
            </option>
          </select>
        </label>
        <div>
          <input
            type="submit"
            value="Send"
            className="review-form__submit bttn--slide-up--green"
          />
          <p className="review-form__errors">{errors.message?.message}</p>
        </div>
      </form>
    </div>
  );
};

export default ReviewForm;
