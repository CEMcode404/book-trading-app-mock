import React, { useState, useEffect, useContext, useRef } from "react";
import EditableDisplayInput from "./common/EditableDisplayInput.jsx";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import getPhoneCodes from "../services/PhoneNoRulesService.js";
import PsswdPromptPopUp from "./PsswdPromptPopUp.jsx";
import { UserContext } from "./context/userContext.js";
import { changeUserInfo } from "../services/authService.js";
import bookLoading from "../assets/bookLoading.gif";

const schema = yup
  .object()
  .shape({
    firstName: yup.string().max(15).label("First Name").required(),
    lastName: yup.string().max(15).label("Last Name").required(),
    mobileNo: yup
      .string()
      .matches(getPhoneCodes(), "Invalid Phone Number.")
      .label("Mobile No.")
      .required(),
    email: yup.string().email().label("Email").required(),
    password: yup.string().max(50).min(5).label("Pasword").required(),
  })
  .required();

const MyDetails = ({ userInfo, setUserInfo }) => {
  const currentUser = useContext(UserContext);

  const {
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
    let defaultValues = userInfo;
    reset({ ...defaultValues });
  }, [userInfo]);
  return (
    <div>
      <form onSubmit={handleSubmit(save)}>
        <EditableDisplayInput
          label={"First Name"}
          className="myDetails__inputTxt"
          isReadOnly={!isEdit}
          defaultValues={userInfo.firstName}
          register={register("firstName")}
          errorMessage={errors.firstName?.message}
        />
        <EditableDisplayInput
          label={"Last Name"}
          className="myDetails__inputTxt"
          isReadOnly={!isEdit}
          defaultValues={userInfo.lastName}
          register={register("lastName")}
          errorMessage={errors.lastName?.message}
        />
        <EditableDisplayInput
          label={"Mobile No."}
          className="myDetails__inputTxt"
          isReadOnly={!isEdit}
          defaultValues={userInfo.mobileNo}
          register={register("mobileNo")}
          errorMessage={errors.mobileNo?.message}
        />
        <EditableDisplayInput
          label={"Email"}
          className="myDetails__inputTxt"
          isReadOnly={!isEdit}
          defaultValues={userInfo.email}
          register={register("email")}
          errorMessage={errors.email?.message}
        />
        <EditableDisplayInput
          inputType={"password"}
          label={"Password"}
          className="myDetails__inputTxt"
          isReadOnly={!isEdit}
          register={register("password")}
          errorMessage={errors.password?.message}
        />
        <input
          type={isEdit ? "submit" : "button"}
          value={isEdit ? "SAVE" : "EDIT"}
          onClick={handleClick}
          className="myDetails__inputBttn bttn--slide-up--gray"
          disabled={Object.values(errors).length > 0}
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
