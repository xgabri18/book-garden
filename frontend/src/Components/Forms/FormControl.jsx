import "./FormControl.css";

const FormControl = ({ id, type, label, placeholder, hideLabel }) => {
  if (hideLabel) {
    return (
      <div>
        <label htmlFor={id} className="sr-only">
          {label}
        </label>
        <input
          type={type}
          id={id}
          placeholder={placeholder}
          className="Form-control"
        />
      </div>
    );
  }

  return (
    <div className="mb-3">
      <label htmlFor={id}>{label}</label>
      <input
        type="text"
        id={id}
        placeholder={placeholder}
        className="Form-control"
      />
    </div>
  );
};

export default FormControl;
