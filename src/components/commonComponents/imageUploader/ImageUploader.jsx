import PropTypes from "prop-types";
import React, {
  forwardRef,
  useState,
  useImperativeHandle,
  useRef,
} from "react";

import uploadToCloudIcon from "./upload-to-cloud-icon.svg";
import "./imageUploader.scss";

const ImageUploader = forwardRef(function ImageUploader(
  {
    accept = "image/png, image/jpeg, image/jpg",
    className = "",
    onClearImages: onClearImagesExternalHook,
    disabled = false,
    id,
    label = "Search for image/s:",
    multiple = true,
    maxImages = 2,
    maxByteSize = 5000000,
    name,
    register,
  },
  externalRef
) {
  //This imageUploader have a dependency with react-hook-form register function

  const defaults = {
    imageUrls: [],
    errors: [],
  };

  const [imageUrls, setImageUrls] = useState(defaults.imageUrls);
  const [errors, setErrors] = useState(defaults.errors);
  const inputFileRef = useRef();

  function updatePreviewDisplay(e) {
    let objectUrls = [];
    let errors = [];
    const images = [...e.target.files];

    if (images.length > maxImages) {
      errors.push(`Maximum of ${maxImages} image/s allowed`);
      setImageUrls(defaults.imageUrls);
      setErrors(errors);
      return;
    }

    let imageNamesWithError = "";
    for (let image of images) {
      if (image.size > maxByteSize) {
        imageNamesWithError += `${image.name}, `;
        continue;
      }

      objectUrls.push(URL.createObjectURL(image));
    }

    if (imageNamesWithError)
      errors.push(
        `${imageNamesWithError}exceeded ${maxByteSize} bytes.`.trim()
      );

    setImageUrls(objectUrls);
    setErrors(errors);
  }

  function clearImagesPreview() {
    inputFileRef.current.files = null;
    setImageUrls(defaults.imageUrls);
    setErrors(defaults.errors);

    if (onClearImagesExternalHook) onClearImagesExternalHook();
  }

  useImperativeHandle(
    externalRef,
    () => {
      return {
        clearImagesPreview,
      };
    },
    []
  );

  const { ref, ...rest } = register(name, { onChange: updatePreviewDisplay });
  return (
    <div className={"image-uploader " + className}>
      <p>{label}</p>
      <label htmlFor={id}>
        <img
          alt="upload to cloud icon"
          className="image-uploader__upload-to-cloud-icon"
          src={uploadToCloudIcon}
        ></img>
      </label>

      <div className="image-uploader__input-image-hider">
        <input
          accept={accept}
          disabled={disabled}
          id={id}
          multiple={multiple}
          name={name}
          ref={(e) => {
            ref(e);
            inputFileRef.current = e;
          }}
          type="file"
          {...rest}
        />
      </div>

      <div className="image-uploader__preview">
        {imageUrls.map((imageURL, index) => (
          <img
            key={index}
            onLoad={() => URL.revokeObjectURL(imageURL)}
            src={imageURL}
          ></img>
        ))}
      </div>

      <div className="image-uploader__errors">
        {errors.map((error, index) => (
          <p key={index}>{error}</p>
        ))}
      </div>

      <div className="image-uploader__clear-bttn-wrapper">
        <input
          className="image-uploader__clear-bttn"
          disabled={disabled}
          onClick={clearImagesPreview}
          type="button"
          value="Clear Images"
        />
      </div>
    </div>
  );
});

ImageUploader.propTypes = {
  accept: PropTypes.string,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  id: PropTypes.string,
  label: PropTypes.string,
  multiple: PropTypes.bool,
  maxImages: PropTypes.number,
  maxByteSize: PropTypes.number,
  name: PropTypes.string.isRequired,
  onClearImages: PropTypes.func,
  register: PropTypes.func.isRequired,
};

export default ImageUploader;
