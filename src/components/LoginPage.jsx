import React, { useContext, useRef } from "react";
import logo from "../assets/bookTrade-fontLogo.svg";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import checkFormErrors from "../utility/checkFormErrors";
import { Navigate, useNavigate } from "react-router-dom";
import { login } from "../services/userService";
import { getCurrentUser } from "../services/tokenService.js";
import { UserContext } from "./context/userContext.js";
import ForgotPasswordPrompt from "./ForgotPasswordPropmt.jsx";

const schema = yup
  .object()
  .shape({
    email: yup.string().email().label("Email").required(),
    password: yup.string().max(50).min(5).label("Pasword").required(),
  })
  .required();

const LoginPage = () => {
  const { user, changeUser } = useContext(UserContext);

  const {
    clearErrors,
    setError,
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const handleOnChange = () => {
    if (errors.apiError?.message) clearErrors("apiError");
  };

  const haveErrors = checkFormErrors(errors);
  const onSubmit = (data) => {
    login(data, (result, err) => {
      if (result) return changeUser(getCurrentUser());
      if (err && err.response.status === 400)
        setError("apiError", { message: err.response.data });
    });
  };

  const navigate = useNavigate();
  const forgotPassDialogRef = useRef();

  function onForgotPassword() {
    const dialogElement = forgotPassDialogRef.current;
    dialogElement.showModal();
  }

  if (user) return <Navigate to="/" replace={true} />;

  return (
    <div className="login-page-wrapper">
      <main className="login-page">
        <object type="image/svg+xml" data={logo} className="login-page__logo">
          2nd booktrade logo
        </object>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            type="text"
            className="login-page__input-field highlight"
            placeholder="Email"
            {...register("email", { onChange: handleOnChange })}
            disabled={isSubmitting}
          />
          <input
            type="password"
            className="login-page__input-field highlight"
            placeholder="Password"
            {...register("password", { onChange: handleOnChange })}
            disabled={isSubmitting}
          />
          <input
            type="submit"
            value="Log in"
            className="login-page__bttn bttn--slide-up--green"
            disabled={isSubmitting}
          />
        </form>
        <div
          className={
            "login-page__errors-display" + (!haveErrors ? "-hide" : "")
          }
        >
          <p>{errors.email?.message}</p>
          <p>{errors.password?.message}</p>
          <p>{errors.apiError?.message}</p>
        </div>
        <div className="login-page__links"></div>
        <p className="login-page__p" onClick={onForgotPassword}>
          Forgot your password?
        </p>
        <hr className="login-page__hr"></hr>
        <p className="login-page__p" onClick={() => navigate("/signup")}>
          Not Sign up Yet?
        </p>
      </main>
      <ForgotPasswordPrompt ref={forgotPassDialogRef} />
    </div>
  );
};

export default LoginPage;
