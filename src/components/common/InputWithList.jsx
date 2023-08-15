import React, {
  forwardRef,
  useEffect,
  useState,
  useImperativeHandle,
} from "react";

const InputWithList = forwardRef(function InputWithList(
  { className = "", id = "", disabled = false, updates },
  externalRef
) {
  const [list, setList] = useState();
  const [input, setInput] = useState("");

  useEffect(() => {
    if (!list) return;

    updates(list);
  }, [list]);

  const handleInputOnChange = (e) => {
    setInput(e.target.value);
  };

  const handleAddListItem = (e) => {
    e.preventDefault();

    const trimmedString = input.trim();
    if (!trimmedString) return;

    if (!list) setList([trimmedString]);
    else setList([...list, trimmedString]);

    setInput("");
  };

  const handleDeleteListItem = (index) => {
    if (disabled) return;

    const listCopy = [...list];
    listCopy.splice(index, 1);

    setList(listCopy);
  };

  const clearList = () => {
    setList(undefined);
  };

  useImperativeHandle(
    externalRef,
    () => {
      return {
        clearList: clearList,
      };
    },
    []
  );

  return (
    <div className={`inputWithList ${className}`}>
      <div className="inputWithList__input-wrapper">
        <input
          type="text"
          onChange={handleInputOnChange}
          value={input}
          id={id}
          disabled={disabled}
        ></input>
        <button
          onClick={handleAddListItem}
          className="inputWithList__add-bttn"
          disabled={disabled}
        >
          Add
        </button>
      </div>
      {list && list.length > 0 && (
        <ul className="inputWithList__list">
          {list.map((item, index) => (
            <li
              key={index}
              className="inputWithList__list-item"
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

export default InputWithList;
