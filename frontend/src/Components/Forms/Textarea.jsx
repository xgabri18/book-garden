import "./Textarea.css";

const Textarea = ({
  id,
  label,
  value,
  name,
  placeholder,
  hideLabel,
  onChange,
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
        onChange={onChange}
        defaultValue={value}
      />
    </div>
  );
};

export default Textarea;
