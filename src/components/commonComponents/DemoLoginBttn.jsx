import PropTypes from "prop-types";
import React, { useContext } from "react";

import { getCurrentUser } from "../../services/tokenService";
import { loginDemo } from "../../services/userService";
import { UserContext } from "../contexts/userContext";

const DemoLoginBttn = ({ className, disabled = false }) => {
  const { changeUser } = useContext(UserContext);

  function handleLogin() {
    loginDemo((result, err) => {
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
