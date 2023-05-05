import React, { forwardRef } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { verifyUserIdentity } from "../services/userService.js";

const passwdSchema = yup
  .object()
  .shape({
    password: yup.string().max(50).min(5).label("Pasword").required(),
  })
  .required();

const PsswdPromptPopUp = forwardRef(function PasswdPromptPopUp(
  { userId, updateFormState, className },
  ref
) {
  const {
    clearErrors,
    setError,
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(passwdSchema) });

  function onSubmit(data) {
    verifyUserIdentity(data.password, userId, (result, err) => {
      if (err) {
        reset({ password: "" });
        setError("apiErrors", {
          type: "custom",
          message: err.response.data,
        });
      }
      if (result && result.status === 200) {
        reset({ password: "" });
        const dialogElement = ref.current;
        updateFormState(data.password);
        dialogElement.close();
      }
    });
  }

  function handleClosePrompt(e) {
    const dialogElement = ref.current;
    const dialogDimensions = dialogElement.getBoundingClientRect();
    if (
      e.clientY < dialogDimensions.top ||
      e.clientY > dialogDimensions.bottom ||
      e.clientX < dialogDimensions.left ||
      e.clientX > dialogDimensions.right
    ) {
      clearErrors();
      reset({ password: "" });
      dialogElement.close();
    }
  }

  return (
    <dialog ref={ref} onClick={handleClosePrompt} className={className}>
      <form
        onSubmit={handleSubmit((data) => {
          onSubmit(data);
        })}
      >
        <label htmlFor="psswdPrompt">Enter your password:</label>
        <div>
          <input id="psswdPrompt" type="password" {...register("password")} />
          <input type="submit" />
        </div>
        <p>{errors.password?.message}</p>
        <p>{errors.apiErrors?.message}</p>
      </form>
    </dialog>
  );
});

export default PsswdPromptPopUp;
