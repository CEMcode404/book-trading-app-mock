import React, { useState, useEffect, useContext, useRef } from "react";
import EditableDisplayInput from "./common/EditableDisplayInput.jsx";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import PsswdPromptPopUp from "./PsswdPromptPopUp.jsx";
import { UserContext } from "./context/userContext.js";
import { changeUserInfo } from "../services/authService.js";
import bookLoading from "../assets/bookLoading.gif";
import PhoneInput from "react-phone-number-input/react-hook-form";
import { isValidPhoneNumber } from "react-phone-number-input";
import "react-phone-number-input/style.css";

yup.addMethod(
  yup.string,
  "isValidPhoneNumber",
  function (options = { message: "Invalid Phone Number." }) {
    const { message } = options;
    return this.test("isValidPhoneNo", message, function (value) {
      const { path, createError } = this;
      const phoneNumber = isValidPhoneNumber(value);
      if (!phoneNumber) return createError({ path, message });
      return true;
    });
  }
);

const schema = yup
  .object()
  .shape({
    firstName: yup.string().max(15).label("First Name").required(),
    lastName: yup.string().max(15).label("Last Name").required(),
    mobileNo: yup.string().isValidPhoneNumber().label("Mobile No.").required(),
    email: yup.string().email().label("Email").required(),
    password: yup.string().max(50).min(5).label("Pasword").required(),
  })
  .required();

const MyDetails = ({ userInfo, setUserInfo }) => {
  const currentUser = useContext(UserContext);

  const {
    control,
    setValue,
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const [password, setPassword] = useState("");
  const [apiError, setApiError] = useState("");
  const [isLoading, setLoadingAnimation] = useState(false);

  function save(data) {
    if (isLoading) return;

    let newUserInfo = { ...data };
    let oldUserInfo = { ...userInfo };
    oldUserInfo.password = password;

    for (let property in newUserInfo) {
      if (newUserInfo[property] === oldUserInfo[property])
        delete newUserInfo[property];
    }

    let defaultValues = userInfo;
    if (Object.values(newUserInfo).length > 0) {
      setLoadingAnimation(true);
      changeUserInfo(newUserInfo, (result, err) => {
        setLoadingAnimation(false);
        if (result) {
          setUserInfo(result.data);
          setValue("password", "");
          setPassword("");
          setToEdit(false);
          return;
        } else if (err) {
          reset({ ...defaultValues });
          setApiError(err.response.data);
        }
      });
      return;
    }

    reset({ ...defaultValues });
    setValue("password", "");
    setToEdit(false);
    setApiError("");
  }

  function updateFormState(password) {
    setToEdit(true);
    setValue("password", password);
    setPassword(password);
  }

  const passwdPromptRef = useRef(null);
  const [isEdit, setToEdit] = useState(false);

  function handleClick() {
    if (!isEdit) {
      passwdPromptRef.current.showModal();
    }
  }

  useEffect(() => {
    let defaultValues = { ...userInfo };
    reset({ ...defaultValues });
  }, [userInfo]);

  return (
    <div>
      <form onSubmit={handleSubmit(save)} className="myDetails__form">
        <EditableDisplayInput
          label={"First Name"}
          className="myDetails__inputTxt"
          isReadOnly={!isEdit}
          defaultValues={userInfo.firstName}
          register={register("firstName")}
          errorMessage={errors.firstName?.message}
          disabled={isLoading}
        />
        <EditableDisplayInput
          label={"Last Name"}
          className="myDetails__inputTxt"
          isReadOnly={!isEdit}
          defaultValues={userInfo.lastName}
          register={register("lastName")}
          errorMessage={errors.lastName?.message}
          disabled={isLoading}
        />

        <div>
          <div className="myDetails__phone-input-wrapper">
            <label htmlFor="mobileNoField">Mobile No. :</label>
            <PhoneInput
              id="mobileNoField"
              name="mobileNo"
              control={control}
              placeholder="Mobile No."
              defaultCountry="PH"
              className="myDetails__inputMobileNo--edit-state"
              disabled={!isEdit || isLoading}
            />
          </div>
          <p className="myDetails__error-message">{errors.mobileNo?.message}</p>
        </div>

        <EditableDisplayInput
          label={"Email"}
          className="myDetails__inputTxt"
          isReadOnly={!isEdit}
          defaultValues={userInfo.email}
          register={register("email")}
          errorMessage={errors.email?.message}
          disabled={isLoading}
        />
        <EditableDisplayInput
          inputType={"password"}
          label={"Password"}
          className="myDetails__inputTxt"
          isReadOnly={!isEdit}
          register={register("password")}
          errorMessage={errors.password?.message}
          disabled={isLoading}
        />
        <input
          type={isEdit ? "submit" : "button"}
          value={isEdit ? "SAVE" : "EDIT"}
          onClick={handleClick}
          className="myDetails__inputBttn bttn--slide-up--gray"
          disabled={Object.values(errors).length > 0 || isLoading}
        />
        <span className="myDetails__span-api-error">{apiError}</span>
        <img
          className={
            isLoading
              ? "myDetails__loading-gif"
              : "myDetails__loading-gif--hide"
          }
          src={bookLoading}
          alt="loading..."
        />
      </form>
      <PsswdPromptPopUp
        userId={currentUser.user._id}
        updateFormState={updateFormState}
        className="myDetails__passwd-prompt"
        ref={passwdPromptRef}
      />
    </div>
  );
};

export default MyDetails;
//check if you can change the form while it is loading
