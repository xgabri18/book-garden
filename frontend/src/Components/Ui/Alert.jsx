import "./Alert.css";

export const Alert = ({ className, message, type, closeable }) => {
  return (
    <div
      className={`Alert Alert-${type} ${className ?? ""}`}
      onClick={(e) => closeable && e.target.classList.add("hidden")}
    >
      {message}
    </div>
  );
};
