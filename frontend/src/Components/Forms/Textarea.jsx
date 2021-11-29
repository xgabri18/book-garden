import "./Textarea.css";

const Textarea = ({
  id,
  label,
  value,
  name,
  placeholder,
  hideLabel,
  ...rest
}) => {
  return (
    <div className="Textarea">
      <label
        htmlFor={id}
        className={`Textarea-label ${hideLabel ? "sr-only" : ""}`}
      >
        {label}
      </label>
      <textarea
        id={id}
        name={name}
        placeholder={placeholder}
        className="Textarea-input"
        defaultValue={value}
        {...rest}
      />
    </div>
  );
};

export default Textarea;
