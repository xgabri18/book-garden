import "./FormControl.css";

const FormControl = ({
  id,
  type,
  label,
  value,
  name,
  placeholder,
  hideLabel,
  ...rest
}) => {
  return (
    <div className="Form-control">
      <label
        htmlFor={id}
        className={`Form-control-label ${hideLabel ? "sr-only" : ""}`}
      >
        {label}
      </label>
      <input
        type={type}
        id={id}
        name={name}
        placeholder={placeholder}
        className="Form-control-input"
        defaultValue={value}
        {...rest}
      />
    </div>
  );
};

export default FormControl;
