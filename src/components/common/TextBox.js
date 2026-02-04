import React from "react";

export const TextBox = ({
  type,
  id,
  name,
  className,
  placeholder,
  label,
  value,
  error,
  onChange,
  onKeyDown,
  accept
}) => {
  return (
    <>
      {label && <label className="label mx-1">{label}</label>}
      <input
        type={type}
        id={id}
        name={name}
        className={className}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onKeyDown={onKeyDown}
        accept={accept}
      />
      {error && (
        <span className="text-danger small-size fw-normal fst-italic">
          {error}
        </span>
      )}
    </>
  );
};
