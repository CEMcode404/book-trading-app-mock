import React, {
  forwardRef,
  useState,
  useImperativeHandle,
  useRef,
} from "react";
import uploadToCloudIcon from "../../assets/upload-to-cloud-icon.svg";

const ImageUploader = forwardRef(function ImageUploader(
  {
    disabled = false,
    className = "",
    label = "Search for image/s:",
    multiple = true,
    accept = "image/png, image/jpeg, image/jpg",
    id,
    register,
    name,
    maxImages,
    maxByteSize,
    clearImagesHook,
    closeDialog,
    openDialog,
  },
  externalRef
) {
  const [imagesURL, setImagesURL] = useState([]);
  const [imageErrors, setErrors] = useState([]);
  const inputFileRef = useRef();

  function onClick() {
    closeDialog();

    function focusOnExit() {
      removeEventListener("focus", focusOnExit);

      setTimeout(() => {
        openDialog();
      }, 275);
    }

    window.addEventListener("focus", focusOnExit);
  }

  function updatePreviewDisplay(e) {
    let urlObjects = [];
    let errors = [];
    const imagesArray = [...e.target.files];

    if (maxImages && imagesArray.length > maxImages) {
      errors.push(`Maximum of ${maxImages} image/s allowed`);
      setImagesURL(urlObjects);
      setErrors(errors);
      return;
    }

    let imageNameWithError = [];
    for (let i = 0; i < imagesArray.length; i++) {
      if (maxByteSize && imagesArray[i].size > maxByteSize) {
        imageNameWithError.push(imagesArray[i].name + " ");
        continue;
      }
      urlObjects.push(URL.createObjectURL(imagesArray[i]));
    }

    if (imageNameWithError.length > 0)
      errors.push(
        `${imageNameWithError
          .toString()
          .replace("[", "")
          .replace("]", "")}exceed ${maxByteSize} bytes`
      );

    setImagesURL(urlObjects);
    setErrors(errors);
  }

  function clearImagesPreview() {
    inputFileRef.current.files = null;
    if (clearImagesHook) clearImagesHook();
    setImagesURL([]);
    setErrors([]);
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
          src={uploadToCloudIcon}
          alt="upload to cloud icon"
          className="image-uploader__upload-to-cloud-icon"
        ></img>
      </label>
      <div className="image-uploader__input-image-hider">
        <input
          id={id}
          type="file"
          multiple={multiple}
          accept={accept}
          onClick={onClick}
          disabled={disabled}
          {...rest}
          name={name}
          ref={(e) => {
            ref(e);
            inputFileRef.current = e;
          }}
        />
      </div>
      <div className="image-uploader__preview">
        {imagesURL.map((imageURL, index) => (
          <img
            key={index}
            src={imageURL}
            onLoad={() => URL.revokeObjectURL(imageURL)}
          ></img>
        ))}
      </div>
      <div className="image-uploader__errors">
        {imageErrors.map((error, index) => (
          <p key={index}>{error}</p>
        ))}
      </div>
      <div className="image-uploader__clear-bttn-wrapper">
        <input
          type="button"
          value="Clear Images"
          className="image-uploader__clear-bttn"
          onClick={clearImagesPreview}
        />
      </div>
    </div>
  );
});

export default ImageUploader;
