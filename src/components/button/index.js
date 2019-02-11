import React from "react";

import "./index.css";

// type = add | edit | default
const Button = ({ onClick, onSubmit, type, children }) => (
  <button onClick={onClick} className={`button ${type}`} onSubmit={onSubmit}>
    {children}
  </button>
);

export default Button;
