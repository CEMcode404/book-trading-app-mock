import React, { Fragment, useRef, useContext } from "react";
import Footer from "./common/Footer.jsx";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import signupIllustration from "../assets/signup_illustration.svg";
import getPhoneCodes from "../services/PhoneNoRulesService.js";
import checkFormErrors from "../utility/checkFormErrors.js";
import { register as regisForm } from "../services/userService.js";
import { Navigate } from "react-router-dom";
import { UserContext } from "./app.jsx";

const schema = yup
  .object()
  .shape({
    firstName: yup.string().max(15).label("First Name").required(),
    lastName: yup.string().max(15).label("Last Name").required(),
    mobileNo: yup
      .string()
      .matches(getPhoneCodes(), "Invalid Phone Number.")
      .label("Mobile No.")
      .required(),
    email: yup.string().email().label("Email").required(),
    password: yup.string().max(50).min(5).label("Pasword").required(),
    confirmPassword: yup
      .string()
      .label("Confirm Password")
      .required()
      .oneOf([yup.ref("password")], "Passwords does not match."),
  })
  .required();

const SignUpPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const inputFields = {
    firstName: "First Name",
    lastName: "Last Name",
    mobileNo: "Mobile No.",
    email: "Email",
    password: "Password",
    confirmPassword: "Confirm Password",
  };

  const scrolltoRef = useRef();
  const { user } = useContext(UserContext);
  const haveErrors = checkFormErrors(errors);
  if (haveErrors) {
    scrolltoRef.current.scrollIntoView({ block: "center" });
  }

  const onSubmit = regisForm;

  if (user) return <Navigate to="/" replace={true} />;

  return (
    <Fragment>
      <main className="sign-up">
        <div className="sign-up__book-wrapper">
          <div className="sign-up__book">
            <section aria-label="sign up" className="book-page1">
              <h1 className="sign-up__h1">Sign Up</h1>
              <form
                id="sign-up-form-id"
                className="signup__form"
                onSubmit={handleSubmit(onSubmit)}
              >
                {Object.entries(inputFields).map((fieldName) => (
                  <input
                    aria-invalid={errors[fieldName[0]] ? "true" : "false"}
                    key={fieldName[0]}
                    type={
                      fieldName[0].toLowerCase().indexOf("password") < 0
                        ? "text"
                        : "password"
                    }
                    className="sign-up__input"
                    {...register(fieldName[0])}
                    placeholder={fieldName[1]}
                  ></input>
                ))}

                <p className="sign-up__p">
                  By clicking Submit, you agree to our Terms, Privacy Policy and
                  Cookies Policy.
                </p>
              </form>
            </section>
            <div className="book-page2">
              <object
                type="image/svg+xml"
                data={signupIllustration}
                className="book-page2__svg"
              >
                Sign Up Illustration
              </object>
            </div>
          </div>
          <input
            form="sign-up-form-id"
            type="submit"
            value="Submit"
            className="sign-up__submit-bttn bttn--slide-up--green"
          ></input>
          <div
            className={
              "sign-up__error-container" + (!haveErrors ? "-hide" : "")
            }
            ref={scrolltoRef}
          >
            <div>
              <p>{errors.firstName?.message}</p>
              <p>{errors.lastName?.message}</p>
              <p>{errors.mobileNo?.message}</p>
              <p>{errors.email?.message}</p>
              <p>{errors.password?.message}</p>
              <p>{errors.confirmPassword?.message}</p>
            </div>
          </div>
        </div>
        <div className="diagonal-separator"></div>
        <Footer fclass="footer--bg-light-green" />
      </main>
    </Fragment>
  );
};

export default SignUpPage;
