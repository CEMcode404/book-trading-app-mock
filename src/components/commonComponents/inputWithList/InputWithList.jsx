import PropTypes from "prop-types";
import React, {
  forwardRef,
  useEffect,
  useState,
  useImperativeHandle,
} from "react";

import "./inputWithList.scss";

const InputWithList = forwardRef(function InputWithList(
  { className = "", disabled = false, id = "", onListUpdateCallback },
  externalRef
) {
  //Initialized this with null/undefined instead of array directly to allow list update callback to trigger only
  //when user started to type within the input thus preventing triggering it onload. Which is useful for preventing
  //displaying errors text on load

  const [list, setList] = useState();
  const [input, setInput] = useState("");

  useEffect(() => {
    if (!list) return;

    onListUpdateCallback(list);
  }, [list]);

  const handleAddListItem = (e) => {
    e.preventDefault();

    const isValidInput = input.trim();
    if (!isValidInput) return;

    !list ? setList([isValidInput]) : setList([...list, isValidInput]);
    setInput("");
  };

  const handleDeleteListItem = (index) => {
    if (disabled) return;

    const listCopy = [...list];
    listCopy.splice(index, 1);

    setList(listCopy);
  };

  useImperativeHandle(
    externalRef,
    () => {
      return {
        clearList: () => setList(undefined),
      };
    },
    []
  );

  return (
    <div className={`input-with-list ${className}`}>
      <div className="input-with-list__input-and-add-bttn">
        <input
          disabled={disabled}
          id={id}
          onChange={(e) => setInput(e.target.value)}
          type="text"
          value={input}
        ></input>
        <button
          className="input-with-list__add-bttn"
          disabled={disabled}
          onClick={handleAddListItem}
        >
          Add
        </button>
      </div>

      {list && list.length > 0 && (
        <ul className="input-with-list__list">
          {list.map((item, index) => (
            <li
              className="input-with-list__list-item"
              key={index}
              onClick={() => handleDeleteListItem(index)}
            >
              {item}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
});

InputWithList.propTypes = {
  className: PropTypes.string,
  disabled: PropTypes.bool,
  id: PropTypes.string,
  onListUpdateCallback: PropTypes.func,
};

export default InputWithList;
