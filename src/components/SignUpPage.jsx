import React, { Fragment } from "react";
import Footer from "./common/Footer.jsx";
import signupIllustration from "../assets/signup_illustration.svg";

const SignUpPage = () => {
  let inputName = [
    "First Name",
    "Last Name",
    "Mobile No.",
    "Address",
    "Email",
    "Password",
    "Repeat Password",
  ];

  return (
    <Fragment>
      <main className="sign-up">
        <div className="sign-up__book-wrapper">
          <div className="sign-up__book">
            <section aria-label="sign up" className="book-page1">
              <form className="signup__form">
                <h1 className="sign-up__h1">Sign Up</h1>
                {inputName.map((name) => (
                  <input
                    key={name}
                    type={
                      name.toLowerCase().indexOf("password") < 0
                        ? "text"
                        : "password"
                    }
                    className="sign-up__input"
                    name={name}
                    placeholder={name}
                  />
                ))}
                <p className="sign-up__p">
                  By clicking Submit, you agree to our Terms, Privacy, Policy
                  and Cookies Policy.
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
            type="submit"
            value="Submit"
            className="sign-up__submit-bttn bttn--slide-up--green"
          ></input>
        </div>
        <div className="diagonal-separator"></div>
        <Footer fclass="footer--bg-light-green" />
      </main>
    </Fragment>
  );
};

export default SignUpPage;
