import errorImage from "../../Assets/error.svg";

export const NotFoundError = () => {
  return (
    <div className="flex flex-col justify-center items-center">
      <div className="mb-4 text-4xl font-bold text-red-500">404</div>
      <div className="mb-8 text-2xl text-gray-600">Not Found</div>
      <img src={errorImage} alt="Not Authorized" className="h-60" />
    </div>
  );
};
