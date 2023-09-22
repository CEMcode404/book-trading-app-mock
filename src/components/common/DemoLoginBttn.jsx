import React from "react";
import { useContext } from "react";
import { login } from "../../services/userService";
import { UserContext } from "../context/userContext";
import * as yup from "yup";
import { getCurrentUser } from "../../services/tokenService";

const DemoLoginBttn = ({ className }) => {
  const { changeUser } = useContext(UserContext);
  const demoUser = {
    email: process.env.DEMO_USER_EMAIL,
    password: process.env.DEMO_USER_PASSWORD,
  };

  const schema = yup
    .object()
    .shape({
      email: yup.string().email().label("Email").required(),
      password: yup.string().max(50).min(5).label("Pasword").required(),
    })
    .required();

  function handleLogin() {
    if (!schema.validateSync(demoUser)) return;

    login(demoUser, (result, err) => {
      if (result) changeUser(getCurrentUser());
    });
  }

  return (
    <input
      className={className}
      type="button"
      onClick={handleLogin}
      value="Demo login"
    />
  );
};

export default DemoLoginBttn;
