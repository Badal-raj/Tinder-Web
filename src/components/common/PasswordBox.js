import React from "react";
export const PasswordBox = ({
  type,
  id,
  name,
  className,
  placeholder,
  label,
  value,
  error,
  onChange,
}) => {
  return (
    <>
      <div className="password-box-style">
        {label && <label className="label mx-1">{label}</label>}
        {/* <div className="password-box-style"> */}
        <input
          type={type}
          name={name}
          id={id}
          className={className}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />
      </div>
      {error && (
        <span className="text-danger small-size fw-normal fst-italic">
          {error}
        </span>
      )}
    </>
  );
};
