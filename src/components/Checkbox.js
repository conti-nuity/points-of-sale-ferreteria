import React from "react";

export const Checkbox = ({ register, watch, setValue, value, keyName }) => {
  return (
    <label className="container">
      <input
        {...register(keyName, { required: true })}
        type="checkbox"
        checked={
          watch(keyName) && parseInt(watch(keyName)[0]) === value ? true : false
        }
        value={value}
        onChange={() => setValue(keyName, [value])}
      />
      <span className="checkmark" />
    </label>
  );
};
