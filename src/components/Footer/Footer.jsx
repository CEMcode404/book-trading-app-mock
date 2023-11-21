import { NavLink } from "react-router-dom";
import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import TitledDropDown from "../commonComponents/titledDropDown/TitledDropDown.jsx";

import facebookLogo from "./assets/Facebook.svg";
import instagramLogo from "./assets/Instagram.svg";
import xLogo from "./assets/x-logo.svg";
import "./footer.scss";

const schema = yup
  .object({
    message: yup.string().max(10000).required().label("Message"),
    email: yup.string().email().required().label("Email"),
  })
  .required();

const Footer = () => {
  const {
    reset,
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: yupResolver(schema) });

  return (
    <footer className="footer">
      <div className="footer__dropdowns">
        <TitledDropDown title="ABOUT US">
          <p className="footer__p">
            Booktrade.com is a company created and aimed to provide a channel
            for students to easily find secondhand books as well as find ways to
            reuse the books you have already read.
          </p>
        </TitledDropDown>

        <TitledDropDown title="MESSAGE US">
          <form onSubmit={handleSubmit(() => reset())}>
            <textarea
              className="footer__textarea highlight"
              disabled={isSubmitting}
              placeholder="Your message..."
              {...register("message")}
            ></textarea>

            <input
              autoComplete="on"
              className="footer__input-text highlight"
              disabled={isSubmitting}
              placeholder="Your email..."
              {...register("email")}
              type="text"
            />

            <p className="footer__error-message">{errors.message?.message}</p>
            <p className="footer__error-message">{errors.email?.message}</p>

            <input
              className="footer__send-bttn bttn--slide-up--purple"
              disabled={isSubmitting}
              type="submit"
              value="Send"
            />
          </form>
        </TitledDropDown>
      </div>

      <hr className="footer__hr" />

      <section aria-label="links" className="footer__links">
        <NavLink className="footer__navlink" to="/reviews">
          Reviews and Testimonials
        </NavLink>

        <NavLink
          className="footer__navlink"
          replace
          to="/policies#safetyAndSecurity"
        >
          Safety and Security
        </NavLink>

        <NavLink className="footer__navlink" replace to="/policies#termsOfUse">
          Terms of Use
        </NavLink>

        <NavLink className="footer__navlink" replace to="/policies#dataPrivacy">
          Data Privacy
        </NavLink>

        <NavLink className="footer__navlink" replace to="/policies#credits">
          Credits
        </NavLink>

        <NavLink className="footer__navlink">Donate</NavLink>
      </section>

      <hr className="footer__hr" />

      <section
        aria-label="social media accounts"
        className="footer__socmed-icons"
      >
        <object className="footer__x" data={xLogo} type="image/svg+xml">
          x logo
        </object>

        <object
          className="footer__instagram"
          data={instagramLogo}
          type="image/svg+xml"
        >
          Instagram
        </object>

        <object
          className="footer__facebook"
          data={facebookLogo}
          type="image/svg+xml"
        >
          Facebook
        </object>
      </section>

      <p className="footer__p--copyright">
        Copyright 2023. All rights reserved
      </p>
    </footer>
  );
};

export default Footer;
