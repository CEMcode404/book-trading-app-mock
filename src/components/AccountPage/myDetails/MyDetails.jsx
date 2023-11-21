import PropTypes from "prop-types";
import { isValidPhoneNumber } from "react-phone-number-input";
import PhoneInput from "react-phone-number-input/react-hook-form";
import React, { useState, useEffect } from "react";
import "react-phone-number-input/style.css";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import EditableDisplayInput from "../../commonComponents/EditableDisplayInput.jsx";
import LoadingIcon from "../../commonComponents/loadingIcon/LoadingIcon.jsx";
import PasswordPrompt from "../../commonComponents/PasswordPrompt.jsx";

import { changeUserInfo } from "../../../services/authService.js";
import { checkEmailAvailability } from "../../../services/userService.js";
import getEmailRules from "../../commonRegexs/getEmailRules.js";
import "./myDetails.scss";

const MyDetails = ({ userInfo, setUserInfo }) => {
  const {
    control,
    formState: { errors, isSubmitting },
    handleSubmit,
    reset,
    register,
    setValue,
  } = useForm({ resolver: yupResolver(generateYupSchema(userInfo.email)) });

  useEffect(() => {
    let newUserInfo = { ...userInfo };
    reset({ ...newUserInfo });
  }, [userInfo]);

  const [password, setPassword] = useState("");
  const [apiError, setApiError] = useState("");
  const [isEdit, setToEdit] = useState(false);
  const [isPasswordPromptOpen, setIsPasswordPromptOpen] = useState(false);

  async function save(newUserInfo) {
    if (isSubmitting) return;

    //discard unmodified fields
    let oldUserInfo = { ...userInfo };
    oldUserInfo.password = password;

    for (let property in newUserInfo) {
      if (newUserInfo[property] === oldUserInfo[property])
        delete newUserInfo[property];
    }

    oldUserInfo = userInfo;
    if (Object.values(newUserInfo).length > 0) {
      changeUserInfo(newUserInfo, (result, err) => {
        if (result) {
          setUserInfo(result.data);
          setAllPasswordStates("");
          setToEdit(false);
        } else if (err) {
          reset({ ...oldUserInfo });
          setApiError("Request failed..");
        }
      });
      return;
    }

    handleCancel();
  }

  function setAllPasswordStates(password) {
    //Password field is empty upon initialization and will only be filled on edit mode for security reasons.
    //There are two password state storage. One is for old password ,filled on password prompt,
    // and the other is the new password, filled on input. These two will be compared on submission to determine
    //if password is modified
    setPassword(password);
    setValue("password", password);
  }

  function handleCancel() {
    if (isSubmitting) return;

    let defaultValues = { ...userInfo };
    reset({ ...defaultValues });
    setAllPasswordStates("");
    setToEdit(false);
    setApiError("");
  }

  function handleOpenPasswordPrompt() {
    if (!isEdit) setIsPasswordPromptOpen(true);
  }

  function setFormToEditState(password) {
    setToEdit(true);
    setAllPasswordStates(password);
  }

  return (
    <div className="my-details">
      <form className="my-details__form" onSubmit={handleSubmit(save)}>
        <EditableDisplayInput
          className="my-details__input"
          disabled={isSubmitting}
          errorMessage={errors.firstName?.message}
          isReadOnly={!isEdit}
          label={"First Name"}
          register={register("firstName")}
        />
        <EditableDisplayInput
          className="my-details__input"
          disabled={isSubmitting}
          errorMessage={errors.lastName?.message}
          isReadOnly={!isEdit}
          label={"Last Name"}
          register={register("lastName")}
        />

        <div>
          <div className="my-details__phone-input-wrapper">
            <label htmlFor="mobileNoField">Mobile No. :</label>
            <PhoneInput
              control={control}
              className="my-details__input--mobile-no"
              defaultCountry="PH"
              disabled={isSubmitting}
              id="mobileNoField"
              name="mobileNo"
              placeholder="Mobile No."
              readOnly={!isEdit}
            />
          </div>
          <p>{errors.mobileNo?.message}</p>
        </div>

        <EditableDisplayInput
          className="my-details__input"
          disabled={isSubmitting}
          errorMessage={errors.email?.message}
          isReadOnly={!isEdit}
          label={"Email"}
          register={register("email")}
        />
        <EditableDisplayInput
          className="my-details__input"
          disabled={isSubmitting}
          errorMessage={errors.password?.message}
          inputType={"password"}
          isReadOnly={!isEdit}
          label={"Password"}
          register={register("password")}
        />

        <input
          className="my-details__edit-bttn bttn--slide-up--gray"
          disabled={Object.values(errors).length > 0 || isSubmitting}
          onClick={handleOpenPasswordPrompt}
          type={isEdit ? "submit" : "button"}
          value={isEdit ? "SAVE" : "EDIT"}
        />
        {isEdit && (
          <input
            className="my-details__cancel-bttn bttn--slide-up--gray"
            disabled={isSubmitting}
            onClick={handleCancel}
            type="button"
            value="CANCEL"
          />
        )}
        <span className="my-details__errors--api">{apiError}</span>

        <LoadingIcon className="my-details__loading" isVisible={isSubmitting} />
      </form>

      <PasswordPrompt
        backDropClickCallBack={() => setIsPasswordPromptOpen(false)}
        className="my-details__passwd-prompt"
        isOpen={isPasswordPromptOpen}
        onClose={() => setIsPasswordPromptOpen(false)}
        onSuccesfullSubmit={setFormToEditState}
      />
    </div>
  );
};

function generateYupSchema(currentEmail) {
  yup.addMethod(
    yup.string,
    "isValidPhoneNumber",
    function (options = { message: "Invalid Phone Number" }) {
      const { message } = options;

      return this.test("isValidPhoneNo", message, function (value) {
        const { path, createError } = this;

        return isValidPhoneNumber(value)
          ? true
          : createError({ path, message });
      });
    }
  );

  yup.addMethod(
    yup.string,
    "isEmailTaken",
    function (
      options = { message: "Email is already taken", currentEmail: null }
    ) {
      const { message, currentEmail } = options;

      return this.test("isEmailTaken", message, async function (email) {
        const { path, createError } = this;

        if (currentEmail === email) return true;

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

  return yup
    .object()
    .shape({
      firstName: yup.string().max(15).label("First Name").required(),
      lastName: yup.string().max(15).label("Last Name").required(),
      mobileNo: yup
        .string()
        .isValidPhoneNumber()
        .label("Mobile No.")
        .required(),
      email: yup
        .string()
        .email()
        .isEmailTaken({ currentEmail })
        .label("Email")
        .required(),
      password: yup.string().max(50).min(5).label("Pasword").required(),
    })
    .required();
}

MyDetails.propTypes = {
  userInfo: PropTypes.shape({
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    mobileNo: PropTypes.string,
    email: PropTypes.string,
  }),
  setUserInfo: PropTypes.func,
};

export default MyDetails;
