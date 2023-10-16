import PropTypes from "prop-types";
import React, { Fragment } from "react";

const EditableDisplayInput = ({
  errorMessage,
  inputType = "text",
  isReadOnly = true,
  label,
  register,
  ...rest
}) => {
  const pointerEvents = isReadOnly ? "none" : "auto";
  return (
    <Fragment>
      <label style={{ pointerEvents }}>
        {label + " : "}

        <input
          autoComplete="on"
          type={inputType}
          readOnly={isReadOnly}
          aria-readonly={isReadOnly}
          {...register}
          {...rest}
          style={{ pointerEvents }}
        />
      </label>

      <p>{errorMessage}</p>
    </Fragment>
  );
};

EditableDisplayInput.propTypes = {
  errorMessage: PropTypes.string,
  inputType: PropTypes.string,
  isReadOnly: PropTypes.bool,
  label: PropTypes.string,
  register: PropTypes.any,
};

export default EditableDisplayInput;
