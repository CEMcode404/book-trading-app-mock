import React from "react";
import logo from "../assets/bookTrade-fontLogo.svg";

const LoginPage = () => {
  return (
    <div className="login-page-wrapper">
      <div className="login-page">
        <object type="image/svg+xml" data={logo} className="login-page__logo">
          2nd booktrade logo
        </object>
        <input
          type="text"
          className="login-page__input-field highlight"
          placeholder="Username"
        />
        <input
          type="password"
          className="login-page__input-field highlight"
          placeholder="Password"
        />
        <input
          type="button"
          value="Log in"
          className="login-page__bttn bttn--slide-up--green"
        />

        <div className="login-page__links"></div>
        <p className="login-page__p">Forgot your password?</p>
        <hr className="login-page__hr"></hr>
        <p className="login-page__p">Not Sign up Yet?</p>
      </div>
    </div>
  );
};

export default LoginPage;
