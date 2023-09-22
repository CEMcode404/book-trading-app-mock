import React, { Fragment } from "react";

const EditableDisplayInput = ({
  inputType = "text",
  label,
  isReadOnly = true,
  register,
  errorMessage,
  ...rest
}) => {
  const editable = isReadOnly ? "none" : "auto";
  return (
    <Fragment>
      <label style={{ pointerEvents: editable }}>
        {label + " : "}
        <input
          autoComplete="on"
          type={inputType}
          readOnly={isReadOnly}
          aria-readonly={isReadOnly}
          {...register}
          {...rest}
          style={{ pointerEvents: editable }}
        />
      </label>
      <p>{errorMessage}</p>
    </Fragment>
  );
};

export default EditableDisplayInput;
