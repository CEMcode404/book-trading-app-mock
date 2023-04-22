import React from "react";
import logo from "../assets/bookTrade-fontLogo.svg";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import checkFormErrors from "../utility/checkFormErrors";

const schema = yup
  .object()
  .shape({
    email: yup.string().email().label("Email").required(),
    password: yup.string().max(20).min(5).label("Pasword").required(),
  })
  .required();

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const haveErrors = checkFormErrors(errors);

  return (
    <div className="login-page-wrapper">
      <main className="login-page">
        <object type="image/svg+xml" data={logo} className="login-page__logo">
          2nd booktrade logo
        </object>
        <form onSubmit={handleSubmit((data) => console.log(data))}>
          <input
            type="text"
            className="login-page__input-field highlight"
            placeholder="Email"
            {...register("email")}
          />
          <input
            type="password"
            className="login-page__input-field highlight"
            placeholder="Password"
            {...register("password")}
          />
          <input
            type="submit"
            value="Log in"
            className="login-page__bttn bttn--slide-up--green"
          />
        </form>
        <div
          className={
            "login-page__errors-display" + (!haveErrors ? "-hide" : "")
          }
        >
          <p>{errors.email?.message}</p>
          <p>{errors.password?.message}</p>
        </div>
        <div className="login-page__links"></div>
        <p className="login-page__p">Forgot your password?</p>
        <hr className="login-page__hr"></hr>
        <p className="login-page__p">Not Sign up Yet?</p>
      </main>
    </div>
  );
};

export default LoginPage;
