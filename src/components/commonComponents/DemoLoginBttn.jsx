import PropTypes from "prop-types";
import React, { useContext } from "react";

import { getCurrentUser } from "../../services/tokenService";
import { login } from "../../services/userService";
import { UserContext } from "../contexts/userContext";
import * as yup from "yup";

const schema = yup
  .object()
  .shape({
    email: yup.string().email().label("Email").required(),
    password: yup.string().max(50).min(5).label("Pasword").required(),
  })
  .required();

const DemoLoginBttn = ({ className, disabled = false }) => {
  const { changeUser } = useContext(UserContext);
  const demoUser = {
    email: process.env.DEMO_USER_EMAIL,
    password: process.env.DEMO_USER_PASSWORD,
  };

  function handleLogin() {
    if (!schema.validateSync(demoUser)) return;

    login(demoUser, (result, err) => {
      if (result) changeUser(getCurrentUser());
    });
  }

  return (
    <input
      className={className}
      disabled={disabled}
      type="button"
      onClick={handleLogin}
      value="Demo login"
    />
  );
};

DemoLoginBttn.propTypes = {
  className: PropTypes.string,
  disabled: PropTypes.bool,
};

export default DemoLoginBttn;
