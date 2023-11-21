import PropTypes from "prop-types";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import Dialog from "./Dialog.jsx";

import { verifyUserIdentity } from "../../services/userService.js";

const passwdSchema = yup
  .object()
  .shape({
    password: yup.string().max(50).min(5).label("Pasword").required(),
  })
  .required();

const PasswordPrompt = ({
  backDropClickCallBack,
  className,
  isOpen = false,
  onClose,
  onSuccesfullSubmit,
}) => {
  const {
    clearErrors,
    formState: { errors, isSubmitting },
    handleSubmit,
    reset,
    register,
    setError,
  } = useForm({ resolver: yupResolver(passwdSchema) });

  useEffect(() => {
    if (!isOpen) {
      clearErrors();
      reset();
    }
  }, [isOpen]);

  function onSubmit(data) {
    verifyUserIdentity(data.password, (result, err) => {
      reset();

      if (err)
        setError("apiErrors", {
          type: "custom",
          message: err.response.data,
        });

      if (result?.status === 200) {
        onSuccesfullSubmit(data.password);
        onClose();
      }
    });
  }

  return (
    <Dialog
      backDropClickCallBack={backDropClickCallBack}
      className={className}
      isOpen={isOpen}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="psswdPrompt">Enter your password:</label>
        <div>
          <input
            autoComplete="on"
            disabled={isSubmitting}
            id="psswdPrompt"
            {...register("password")}
            type="password"
          />
          <input disabled={isSubmitting} type="submit" />
        </div>
        <p>{errors.password?.message}</p>
        <p>{errors.apiErrors?.message}</p>
      </form>
    </Dialog>
  );
};

PasswordPrompt.propTypes = {
  backDropClickCallBack: PropTypes.func,
  className: PropTypes.string,
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
  onSuccesfullSubmit: PropTypes.func,
};

export default PasswordPrompt;
