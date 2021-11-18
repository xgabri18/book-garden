import "./FormControl.css";

const FormControl = ({ id, type, label, placeholder, hideLabel }) => {
  if (hideLabel) {
    return (
      <div className="Form-control">
        <label htmlFor={id} className="Form-control-label sr-only">
          {label}
        </label>
        <input
          type={type}
          id={id}
          placeholder={placeholder}
          className="Form-control-input"
        />
      </div>
    );
  }

  return (
    <div className="Form-control">
      <label htmlFor={id} className="Form-control-label">
        {label}
      </label>
      <input
        type="text"
        id={id}
        placeholder={placeholder}
        className="Form-control-input"
      />
    </div>
  );
};

export default FormControl;
