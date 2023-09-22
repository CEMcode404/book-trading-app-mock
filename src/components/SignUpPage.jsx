import React, { Fragment, useRef, useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import signupIllustration from "../assets/signup_illustration.svg";
import checkFormErrors from "../utility/checkFormErrors.js";
import {
  register as regisForm,
  checkEmailAvailability,
} from "../services/userService.js";
import { Navigate } from "react-router-dom";
import { getCurrentUser } from "../services/tokenService.js";
import { UserContext } from "./context/userContext.js";
import PhoneInput from "react-phone-number-input/react-hook-form";
import { isValidPhoneNumber } from "react-phone-number-input";
import "react-phone-number-input/style.css";
import getEmailRules from "../utility/getEmailRules.js";
import bookLoading from "../assets/bookLoading.gif";
import DemoLoginBttn from "./common/DemoLoginBttn.jsx";

yup.addMethod(
  yup.string,
  "isValidPhoneNumber",
  function (options = { message: "Invalid Phone Number" }) {
    const { message } = options;
    return this.test("isValidPhoneNo", message, function (value) {
      const { path, createError } = this;
      const phoneNumber = isValidPhoneNumber(value);
      if (!phoneNumber) return createError({ path, message });
      return true;
    });
  }
);

yup.addMethod(
  yup.string,
  "isEmailTaken",
  function (options = { message: "Email is already taken" }) {
    const { message } = options;
    return this.test("isEmailTaken", message, async function (email) {
      const { path, createError } = this;

      const isEmailValid = yup
        .string()
        .matches(getEmailRules())
        .isValidSync(email);
      const invalidErrorMessage = "Email must be a valid email";
      if (!isEmailValid)
        return createError({ path, message: invalidErrorMessage });

      const result = await checkEmailAvailability({ email });

      if (result.status) return result.status === 200;

      if (result.response.data !== message) {
        return createError({ path, message: invalidErrorMessage });
      }
      return createError({ path, message });
    });
  }
);

const schema = yup
  .object()
  .shape({
    firstName: yup.string().max(15).label("First Name").required(),
    lastName: yup.string().max(15).label("Last Name").required(),
    mobileNo: yup.string().isValidPhoneNumber().label("Mobile No.").required(),
    email: yup.string().email().isEmailTaken().label("Email").required(),
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
    control,
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
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

  const { user, changeUser } = useContext(UserContext);
  const haveErrors = checkFormErrors(errors);

  const [firstScroll, triggerFirstScroll] = useState(false);
  if (haveErrors) {
    if (!firstScroll) {
      scrolltoRef.current.scrollIntoView({ block: "center" });
      triggerFirstScroll(true);
    }
  }

  const onSubmit = (data) => {
    regisForm(data, (result, err) => {
      if (result) return changeUser(getCurrentUser());
    });
  };

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
                {Object.entries(inputFields).map((fieldName) => {
                  if (fieldName[0] === "mobileNo")
                    return (
                      <PhoneInput
                        name="mobileNo"
                        control={control}
                        placeholder="Mobile No."
                        defaultCountry="PH"
                        className="sign-up__input--mobileNo"
                        disabled={isSubmitting}
                        key={fieldName[0]}
                      />
                    );
                  return (
                    <input
                      aria-invalid={errors[fieldName[0]] ? "true" : "false"}
                      key={fieldName[0]}
                      type={
                        fieldName[0].toLowerCase().indexOf("password") < 0
                          ? "text"
                          : "password"
                      }
                      autoComplete="on"
                      className="sign-up__input"
                      {...register(fieldName[0])}
                      placeholder={fieldName[1]}
                      readOnly={isSubmitting}
                    ></input>
                  );
                })}

                {isSubmitting && (
                  <img
                    src={bookLoading}
                    className="sign-up__loading-gif"
                    alt="Loading..."
                  />
                )}

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
          <div className="sign-up__bttns-wrapper">
            <input
              form="sign-up-form-id"
              type="submit"
              value="Submit"
              className="sign-up__submit-bttn bttn--slide-up--green"
              disabled={isSubmitting}
            ></input>
            <DemoLoginBttn className="sign-up__demo-login-bttn bttn--slide-up--gray" />
          </div>
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
      </main>
    </Fragment>
  );
};

export default SignUpPage;
