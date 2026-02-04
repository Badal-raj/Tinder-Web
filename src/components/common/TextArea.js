export const TextArea = ({
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
      {label && <label className="label mx-1">{label}</label>}
      <textarea
        id={id}
        name={name}
        className={className}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
      {error && (
        <span className="text-danger small-size fw-normal fst-italic">
          {error}
        </span>
      )}
    </>
  );
};
