import "./BookTitleItem.css";
import { Link } from "react-router-dom";
import { Rating } from "../Ui/Rating";

export const BookTitleItem = ({ bookTitle }) => {
  return (
    <Link to={`/book-titles/${bookTitle.id}`} className="BookTitleItem">
      <img
        className={`BookTitleItem-image ${
          bookTitle.availability ? "" : "filter grayscale"
        }
        `}
        src={bookTitle.photo}
        alt={bookTitle.name}
      />
      <div className="BookTitleItem-name">{bookTitle.name}</div>
      <div className="BookTitleItem-genre">{bookTitle.genre}</div>
      {bookTitle.availability ? (
        <div className="flex justify-center text-gray-400">
          <Rating rating={bookTitle.rating / 2} className="h-4" />
        </div>
      ) : (
        <div className="text-sm text-red-500">Need Votes</div>
      )}
    </Link>
  );
};
