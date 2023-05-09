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
import { checkEmailAvailability } from "../services/userService.js";
import getEmailRules from "../utility/getEmailRules.js";

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
    formState: { errors, isSubmitting },
  } = useForm({ resolver: yupResolver(schema) });

  const [password, setPassword] = useState("");
  const [apiError, setApiError] = useState("");

  function save(data) {
    if (isSubmitting) return;

    let newUserInfo = { ...data };
    let oldUserInfo = { ...userInfo };
    oldUserInfo.password = password;

    for (let property in newUserInfo) {
      if (newUserInfo[property] === oldUserInfo[property])
        delete newUserInfo[property];
    }

    let defaultValues = userInfo;
    if (Object.values(newUserInfo).length > 0) {
      changeUserInfo(newUserInfo, (result, err) => {
        if (result) {
          setUserInfo(result.data);
          setValue("password", "");
          setPassword("");
          setToEdit(false);
        } else if (err) {
          reset({ ...defaultValues });
          setApiError("Request failed..");
        }
      });
    }
  }

  function updateFormState(password) {
    setToEdit(true);
    setValue("password", password);
    setPassword(password);
  }

  const passwdPromptRef = useRef(null);
  const [isEdit, setToEdit] = useState(false);

  function handleEdit() {
    if (!isEdit) {
      passwdPromptRef.current.showModal();
    }
  }

  function handleCancel() {
    if (isSubmitting) return;

    let defaultValues = { ...userInfo };
    reset({ ...defaultValues });
    setValue("password", "");
    setToEdit(false);
    setApiError("");
    setPassword("");
  }

  useEffect(() => {
    let defaultValues = { ...userInfo };
    reset({ ...defaultValues });
  }, [userInfo]);

  return (
    <div>
      <form onSubmit={handleSubmit(save)} className="my-details__form">
        <EditableDisplayInput
          label={"First Name"}
          className="my-details__inputTxt"
          isReadOnly={!isEdit}
          defaultValues={userInfo.firstName}
          register={register("firstName")}
          errorMessage={errors.firstName?.message}
          disabled={isSubmitting}
        />
        <EditableDisplayInput
          label={"Last Name"}
          className="my-details__inputTxt"
          isReadOnly={!isEdit}
          defaultValues={userInfo.lastName}
          register={register("lastName")}
          errorMessage={errors.lastName?.message}
          disabled={isSubmitting}
        />

        <div>
          <div className="my-details__phone-input-wrapper">
            <label htmlFor="mobileNoField">Mobile No. :</label>
            <PhoneInput
              id="mobileNoField"
              name="mobileNo"
              control={control}
              placeholder="Mobile No."
              defaultCountry="PH"
              className="my-details__inputMobileNo--edit-state"
              disabled={!isEdit || isSubmitting}
            />
          </div>
          <p className="my-details__error-message">
            {errors.mobileNo?.message}
          </p>
        </div>

        <EditableDisplayInput
          label={"Email"}
          className="my-details__inputTxt"
          isReadOnly={!isEdit}
          defaultValues={userInfo.email}
          register={register("email")}
          errorMessage={errors.email?.message}
          disabled={isSubmitting}
        />
        <EditableDisplayInput
          inputType={"password"}
          label={"Password"}
          className="my-details__inputTxt"
          isReadOnly={!isEdit}
          register={register("password")}
          errorMessage={errors.password?.message}
          disabled={isSubmitting}
        />
        <input
          type={isEdit ? "submit" : "button"}
          value={isEdit ? "SAVE" : "EDIT"}
          onClick={handleEdit}
          className="my-details__edit-bttn bttn--slide-up--gray"
          disabled={Object.values(errors).length > 0 || isSubmitting}
        />
        {isEdit && (
          <input
            type="button"
            value="CANCEL"
            onClick={handleCancel}
            className="my-details__cancel-bttn bttn--slide-up--gray"
            disabled={isSubmitting}
          />
        )}
        <span className="my-details__span-api-error">{apiError}</span>
        <img
          className={
            isSubmitting
              ? "my-details__loading-gif"
              : "my-details__loading-gif--hide"
          }
          src={bookLoading}
          alt="loading..."
        />
      </form>
      <PsswdPromptPopUp
        userId={currentUser.user._id}
        updateFormState={updateFormState}
        className="my-details__passwd-prompt"
        ref={passwdPromptRef}
      />
    </div>
  );
};

export default MyDetails;
