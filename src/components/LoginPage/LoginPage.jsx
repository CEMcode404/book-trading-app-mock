import { Navigate, useNavigate } from "react-router-dom";
import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import DemoLoginBttn from "../commonComponents/DemoLoginBttn.jsx";
import ForgotPasswordPrompt from "./forgotPasswordPrompt/ForgotPasswordPrompt.jsx";

import { getCurrentUser } from "../../services/tokenService.js";
import logo from "../../assets/bookTrade-fontLogo.svg";
import { login } from "../../services/userService.js";
import { UserContext } from "../contexts/userContext.js";
import "./loginPage.scss";

const schema = yup
  .object()
  .shape({
    email: yup.string().email().label("Email").required(),
    password: yup.string().max(50).min(5).label("Pasword").required(),
  })
  .required();

const LoginPage = () => {
  const {
    clearErrors,
    formState: { errors, isSubmitting },
    handleSubmit,
    register,
    setError,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [isForgotPasswordPromptOpen, setIsForgotPasswordPromptOpen] =
    useState(false);
  const navigate = useNavigate();

  const { user, changeUser } = useContext(UserContext);
  if (user) return <Navigate to="/" replace={true} />;

  function handleOnChange() {
    if (errors.apiError?.message) clearErrors("apiError");
  }

  function onSubmit(data) {
    login(data, (result, err) => {
      if (result) return changeUser(getCurrentUser());
      if (err && err.response.status === 400)
        setError("apiError", { message: err.response.data });
    });
  }

  function haveErrors(errObject) {
    return !!Object.values(errObject).length;
  }

  function handleForgotPassword() {
    if (!isSubmitting) setIsForgotPasswordPromptOpen(true);
  }

  return (
    <div className="login-page__wrapper">
      <main className="login-page">
        <object className="login-page__logo" data={logo} type="image/svg+xml">
          2nd booktrade logo
        </object>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            autoComplete="on"
            className="login-page__input-field highlight"
            disabled={isSubmitting}
            placeholder="Email"
            {...register("email", { onChange: handleOnChange })}
            type="text"
          />
          <input
            autoComplete="on"
            className="login-page__input-field highlight"
            disabled={isSubmitting}
            placeholder="Password"
            {...register("password", { onChange: handleOnChange })}
            type="password"
          />
          <input
            className="login-page__bttn bttn--slide-up--green"
            disabled={isSubmitting}
            type="submit"
            value="Log in"
          />
          <DemoLoginBttn
            className="login-page__bttn--demo bttn--slide-up--gray"
            disabled={isSubmitting}
          />
        </form>

        {haveErrors(errors) && (
          <div className="login-page__errors">
            <p>{errors.email?.message}</p>
            <p>{errors.password?.message}</p>
            <p>{errors.apiError?.message}</p>
          </div>
        )}
        <div className="login-page__links"></div>
        <p className="login-page__p" onClick={handleForgotPassword}>
          Forgot your password?
        </p>
        <hr className="login-page__hr" />
        <p className="login-page__p" onClick={() => navigate("/signup")}>
          Not Sign up Yet?
        </p>
      </main>

      <ForgotPasswordPrompt
        backDropClickCallBack={() => setIsForgotPasswordPromptOpen(false)}
        isOpen={isForgotPasswordPromptOpen}
      />
    </div>
  );
};

export default LoginPage;
