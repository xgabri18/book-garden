import "./Alert.css";

export const Alert = ({ className, message, type, onClick }) => {
  return (
    <div className={`Alert Alert-${type} ${className ?? ""}`} onClick={onClick}>
      {message}
    </div>
  );
};
