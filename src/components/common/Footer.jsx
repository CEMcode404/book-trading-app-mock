import React from "react";
import DropDownV2 from "./DropDownV2.jsx";
import logo from "../../assets/noBG-logo.svg";
import facebookLogo from "../../assets/Facebook.svg";
import twitterLogo from "../../assets/Twitter.svg";
import instagramLogo from "../../assets/Twitter.svg";

const Footer = ({ fclass, display = true }) => {
  const footer = !display ? null : (
    <footer className={"footer " + fclass}>
      <div className="footer__dropDowns">
        <DropDownV2 title="ABOUT US">
          <p className="footer__p">
            Booktrade.com is a company created and aimed to provide a channel
            for students to easily find secondhand books as well as find ways to
            reuse the books you have already read.
          </p>
        </DropDownV2>
        <DropDownV2 title="MESSAGE US">
          <textarea
            className="footer__textarea highlight"
            placeholder="Your message..."
          ></textarea>
          <input
            type="text"
            className="footer__input-text highlight"
            placeholder="Your email..."
          ></input>
          <input
            type="button"
            value="Send"
            className="footer__send-bttn bttn--slide-up--purple"
          />
        </DropDownV2>
      </div>

      <hr className="footer__hr"></hr>
      <section className="footer__links" aria-label="links">
        <p className="footer__p">Reviews and Testimonials</p>
        <p className="footer__p">Safety and Security</p>
        <p className="footer__p">Terms of Use</p>
        <p className="footer__p">Data Privacy</p>
        <p className="footer__p">Credits</p>
        <p className="footer__p">Donate</p>
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
      <hr className="footer__hr"></hr>
      <div className="footer__logo-wrapper">
        <object type="image/svg+xml" data={logo} className="footer__logo">
          Logo
        </object>
        <p>Copyright 2023. All rights reserved</p>
      </div>
    </footer>
  );

  return footer;
};

export default Footer;
