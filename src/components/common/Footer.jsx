import React from "react";
import TitledDropDown from "./TitledDropDown.jsx";
import facebookLogo from "../../assets/Facebook.svg";
import twitterLogo from "../../assets/Twitter.svg";
import instagramLogo from "../../assets/Instagram.svg";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { NavLink } from "react-router-dom";
import * as yup from "yup";

const schema = yup
  .object({
    message: yup.string().max(10000).required().label("Message"),
    email: yup.string().email().required().label("Email"),
  })
  .required();

const Footer = ({ fclass, display = true }) => {
  const {
    reset,
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = (data) => {
    reset();
  };

  const footer = !display ? null : (
    <footer className={"footer " + fclass}>
      <div className="footer__dropDowns">
        <TitledDropDown title="ABOUT US">
          <p className="footer__p">
            Booktrade.com is a company created and aimed to provide a channel
            for students to easily find secondhand books as well as find ways to
            reuse the books you have already read.
          </p>
        </TitledDropDown>
        <TitledDropDown title="MESSAGE US">
          <form onSubmit={handleSubmit(onSubmit)}>
            <textarea
              className="footer__textarea highlight"
              placeholder="Your message..."
              {...register("message")}
              disabled={isSubmitting}
            ></textarea>
            <input
              autoComplete="on"
              type="text"
              className="footer__input-text highlight"
              placeholder="Your email..."
              {...register("email")}
              disabled={isSubmitting}
            ></input>
            <p className="footer__error-message">{errors.message?.message}</p>
            <p className="footer__error-message">{errors.email?.message}</p>
            <input
              type="submit"
              value="Send"
              className="footer__send-bttn bttn--slide-up--purple"
            />
          </form>
        </TitledDropDown>
      </div>

      <hr className="footer__hr"></hr>
      <section className="footer__links" aria-label="links">
        <NavLink className="footer__navlink" to="/reviews">
          Reviews and Testimonials
        </NavLink>
        <NavLink
          className="footer__navlink"
          to="/policies#safetyAndSecurity"
          replace
        >
          Safety and Security
        </NavLink>
        <NavLink className="footer__navlink" to="/policies#termsOfUse" replace>
          Terms of Use
        </NavLink>
        <NavLink className="footer__navlink" to="/policies#dataPrivacy" replace>
          Data Privacy
        </NavLink>
        <NavLink className="footer__navlink" to="/policies#credits" replace>
          Credits
        </NavLink>
        <NavLink className="footer__navlink">Donate</NavLink>
      </section>
      <hr className="footer__hr"></hr>
      <section
        aria-label="social media accounts"
        className="footer__socmed-icons"
      >
        <object
          type="image/svg+xml"
          data={twitterLogo}
          className="footer__twitter"
        >
          Twitter
        </object>
        <object
          type="image/svg+xml"
          data={instagramLogo}
          className="footer__instagram"
        >
          Instagram
        </object>
        <object
          type="image/svg+xml"
          data={facebookLogo}
          className="footer__facebook"
        >
          Facebook
        </object>
      </section>

      <p className="footer__p--copyright">
        Copyright 2023. All rights reserved
      </p>
    </footer>
  );

  return footer;
};

export default Footer;
