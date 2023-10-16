import { isValidPhoneNumber } from "react-phone-number-input";
import PhoneInput from "react-phone-number-input/react-hook-form";
import React, { useRef, useContext, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import DemoLoginBttn from "../commonComponents/DemoLoginBttn.jsx";
import LoadingIcon from "../commonComponents/loadingIcon/LoadingIcon.jsx";

import getEmailRules from "../commonRegexs/getEmailRules.js";
import { getCurrentUser } from "../../services/tokenService.js";
import {
  register as regisForm,
  checkEmailAvailability,
} from "../../services/userService.js";
import signupIllustration from "./signup_illustration.svg";
import { UserContext } from "../contexts/userContext.js";

import "react-phone-number-input/style.css";
import "./signUpPage.scss";

const SignUpPage = () => {
  const {
    control,
    formState: { errors, isSubmitting },
    handleSubmit,
    register,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const errorsContainerRef = useRef();
  useEffect(() => {
    if (haveErrors(errors))
      errorsContainerRef.current.scrollIntoView({ block: "center" });
  }, [errors]);

  function haveErrors(errObject) {
    return !!Object.values(errObject).length;
  }

  const { user, changeUser } = useContext(UserContext);
  if (user) return <Navigate to="/" replace={true} />;

  async function onSubmit(data) {
    regisForm(data, (result, err) => {
      if (result) return changeUser(getCurrentUser());
    });
  }

  const inputFields = {
    firstName: "First Name",
    lastName: "Last Name",
    mobileNo: "Mobile No.",
    email: "Email",
    password: "Password",
    confirmPassword: "Confirm Password",
  };

  return (
    <main className="sign-up">
      <div className="sign-up__book-wrapper">
        <div className="sign-up__book">
          <section aria-label="sign up" className="sign-up__book-page1">
            <h1 className="sign-up__h1">Sign Up</h1>
            <form
              className="sign-up__form"
              id="sign-up__form"
              onSubmit={handleSubmit(onSubmit)}
            >
              {Object.entries(inputFields).map((fieldName) => {
                if (fieldName[1] === inputFields.mobileNo)
                  return (
                    <PhoneInput
                      control={control}
                      className="sign-up__input--mobile-no"
                      disabled={isSubmitting}
                      defaultCountry="PH"
                      key={fieldName[0]}
                      name={fieldName[0]}
                      placeholder={fieldName[1]}
                    />
                  );

                const isPasswordField =
                  fieldName[0].toLowerCase().indexOf("password") >= 0;

                return (
                  <input
                    aria-invalid={errors[fieldName[0]] ? "true" : "false"}
                    autoComplete="on"
                    className="sign-up__input"
                    key={fieldName[0]}
                    placeholder={fieldName[1]}
                    readOnly={isSubmitting}
                    {...register(fieldName[0])}
                    type={isPasswordField ? "password" : "text"}
                  ></input>
                );
              })}

              <LoadingIcon isVisible={isSubmitting} />

              <p className="sign-up__p">
                By clicking Submit, you agree to our Terms, Privacy Policy and
                Cookies Policy.
              </p>
            </form>
          </section>

          <div className="sign-up__book-page2">
            <object
              className="sign-up__illustration"
              data={signupIllustration}
              type="image/svg+xml"
            >
              Sign Up Illustration
            </object>
          </div>
        </div>
        <div className="sign-up__bttns-wrapper">
          <input
            className="sign-up__submit-bttn bttn--slide-up--green"
            disabled={isSubmitting}
            form="sign-up__form"
            type="submit"
            value="Submit"
          ></input>
          <DemoLoginBttn
            className="sign-up__demo-login-bttn bttn--slide-up--gray"
            disabled={isSubmitting}
          />
        </div>

        {haveErrors(errors) && (
          <div className="sign-up__error-container" ref={errorsContainerRef}>
            <div>
              {Object.values(errors).map((error, index) => (
                <p key={index}>{error?.message}</p>
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
};

yup.addMethod(
  yup.string,
  "isValidPhoneNumber",
  function (options = { message: "Invalid Phone Number" }) {
    const { message } = options;

    return this.test("isValidPhoneNo", message, function (value) {
      const { path, createError } = this;

      return isValidPhoneNumber(value) ? true : createError({ path, message });
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

      //Extended and added an extra email validation rules because the built in
      //yup email validation does not match with the back end server validation
      //this is to prevent inconsistency
      const invalidErrorMessage = "Email must be a valid email";
      const isEmailValid = yup
        .string()
        .matches(getEmailRules())
        .isValidSync(email);
      if (!isEmailValid)
        return createError({ path, message: invalidErrorMessage });

      return (await checkEmailAvailability({ email }))?.status === 200;
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

export default SignUpPage;
