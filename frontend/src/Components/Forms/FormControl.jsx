import "./FormControl.css";

const FormControl = ({
  id,
  type,
  label,
  value,
  name,
  placeholder,
  hideLabel,
  onChange,
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
        onChange={onChange}
        defaultValue={value}
      />
    </div>
  );
};

export default FormControl;
