import React, { forwardRef, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup
  .object({
    email: yup.string().email().label("Email").required(),
  })
  .required();

const ForgotPasswordPrompt = forwardRef(function ForgotPasswordPrompt({}, ref) {
  const {
    reset,
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
  });

  function handleClosePrompt(e) {
    const dialogElement = ref.current;
    const dialogDimensions = dialogElement.getBoundingClientRect();
    if (
      e.clientY < dialogDimensions.top ||
      e.clientY > dialogDimensions.bottom ||
      e.clientX < dialogDimensions.left ||
      e.clientX > dialogDimensions.right
    ) {
      reset();
      setIsEmailSent(false);
      dialogElement.close();
    }
  }

  const onSubmit = (data) => {
    setIsEmailSent(true);
    reset();
  };

  const [isEmailSent, setIsEmailSent] = useState(false);

  return (
    <dialog ref={ref} onClick={handleClosePrompt} className="forgot-password">
      {!isEmailSent && (
        <form onSubmit={handleSubmit(onSubmit)}>
          <label
            htmlFor="forgot-password___email-input"
            className="forgot-password__label"
          >
            Please enter your email to search for your account.
          </label>
          <div>
            <input
              type="text"
              id="forgot-password__email-input"
              {...register("email")}
              disabled={isSubmitting}
              className="forgot-password__email-input"
            />
            <input
              type="submit"
              value="Submit"
              disabled={isSubmitting}
              className="forgot-password__submit-bttn bttn--slide-up--gray"
            />
          </div>
          <p className="forgot-password__error">{errors.email?.message}</p>
        </form>
      )}
      {isEmailSent && <p>Your password has been sent to your email.</p>}
    </dialog>
  );
});

export default ForgotPasswordPrompt;
