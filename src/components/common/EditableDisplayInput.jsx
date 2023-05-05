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
  const errorStyle = errorMessage
    ? {
        marginTop: ".5rem",
        marginBottm: ".5rem",
        paddingLeft: "5ch",
        color: "red",
      }
    : null;
  return (
    <Fragment>
      <label style={{ pointerEvents: editable }}>
        {label + " : "}
        <input
          type={inputType}
          readOnly={isReadOnly}
          aria-readonly={isReadOnly}
          {...register}
          {...rest}
          style={{ pointerEvents: editable }}
        />
      </label>
      <p style={errorStyle}>{errorMessage}</p>
    </Fragment>
  );
};

export default EditableDisplayInput;
