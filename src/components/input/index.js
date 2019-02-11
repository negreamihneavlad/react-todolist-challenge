import React from "react";

import "./index.css";

const Input = ({ name, value, placeholder, className, onChange, onBlur }) => (
  <input
    type="text"
    name={name}
    value={value}
    placeholder={placeholder}
    className={className}
    onChange={event => onChange(event.target.value)}
    onBlur={onBlur}
  />
);

export default Input;
