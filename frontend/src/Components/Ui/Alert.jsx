import "./Alert.css";

export const Alert = ({ className, message, type, onClick }) => {
  function removeAlert(element) {
    element.remove();
  }

  return (
    <div className={`Alert Alert-${type} ${className ?? ""}`} onClick={onClick}>
      {message}
    </div>
  );
};
