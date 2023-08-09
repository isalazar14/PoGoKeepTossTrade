import React, { useContext } from "react";
import Context from "../context/Context";

const FieldBar = () => {
  const { fieldState, setFieldState } = useContext(Context);
  return (
    <div>
      {Object.keys(fieldState).map((field, i) => (
        <button
          className="col btn py-1"
          key={i}
          onClick={() =>
            setFieldState({
              ...fieldState,
              [field]: !fieldState[field],
            })
          }
        >
          {field}
        </button>
      ))}
    </div>
  );
};

export default FieldBar;
