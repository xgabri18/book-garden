import "./Alert.css";

export const Alert = ({ className, message, type, onClick, ...rest }) => {
  return (
    <div
      className={`Alert Alert-${type} ${className ?? ""}`}
      onClick={onClick}
      {...rest}
    >
      {message}
    </div>
  );
};
