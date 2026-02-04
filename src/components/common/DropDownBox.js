export const DropDownBox = ({
  options = [],
  value,
  name,
  id,
  label,
  onChange,
  error
}) => {
  return (
    <>
      {label && (
        <label htmlFor={id || name} className="label mx-1">
          {label}
        </label>
      )}

      <select
        name={name}
        id={id}
        className={"form-select"}
        value={value}
        onChange={onChange}
      >
        {options.map((data, index) => (
          <option key={index} value={data.value}>
            {data.label}
          </option>
        ))}
      </select>
      {error && (
        <span className="text-danger small-size fw-normal fst-italic">
          {error}
        </span>
      )}
    </>
  );
};
