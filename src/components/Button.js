import React from "react";
import "./Button.css";

const Button = ({ onClick }) => {
  return (
    <div>
      <button onClick={onClick}>Explain</button>
    </div>
  );
};

export default Button;
