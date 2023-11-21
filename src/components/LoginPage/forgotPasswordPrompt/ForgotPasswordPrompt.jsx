import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import Dialog from "../../commonComponents/Dialog.jsx";

import "./forgotPasswordPrompt.scss";

const schema = yup
  .object({
    email: yup.string().email().label("Email").required(),
  })
  .required();

const ForgotPasswordPrompt = ({ backDropClickCallBack, isOpen }) => {
  const {
    formState: { errors, isSubmitting },
    handleSubmit,
    reset,
    register,
  } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    if (!isOpen) {
      reset();
      setIsEmailSent(false);
    }
  }, [isOpen]);

  const [isEmailSent, setIsEmailSent] = useState(false);

  function onSubmit() {
    setIsEmailSent(true);
    reset();
  }

  return (
    <Dialog
      backDropClickCallBack={backDropClickCallBack}
      className="forgot-password-prompt"
      isOpen={isOpen}
    >
      {!isEmailSent && (
        <form onSubmit={handleSubmit(onSubmit)}>
          <label
            className="forgot-password-prompt__label"
            htmlFor="forgot-password-prompt__email-input"
          >
            Please enter your email to search for your account.
          </label>
          <div>
            <input
              autoComplete="on"
              className="forgot-password-prompt__email-input"
              disabled={isSubmitting}
              id="forgot-password-prompt__email-input"
              {...register("email")}
              type="text"
            />
            <input
              className="forgot-password-prompt__submit-bttn bttn--slide-up--gray"
              disabled={isSubmitting}
              type="submit"
              value="Submit"
            />
          </div>
          <p className="forgot-password-prompt__error">
            {errors.email?.message}
          </p>
        </form>
      )}
      {isEmailSent && <p>Your password has been sent to your email.</p>}
    </Dialog>
  );
};

ForgotPasswordPrompt.propTypes = {
  backDropClickCallBack: PropTypes.func,
  className: PropTypes.string,
  isOpen: PropTypes.bool,
};

export default ForgotPasswordPrompt;
