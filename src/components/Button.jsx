import React from "react";

const Button = (props) => {
  const { className, onClick, children } = props;
  return (
    <button
      className={`w-full rounded-xl p-3 ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
