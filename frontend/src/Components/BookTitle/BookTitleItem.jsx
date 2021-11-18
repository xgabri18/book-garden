import "./BookTitleItem.css";
import { Link } from "react-router-dom";

export const BookTitleItem = ({ bookTitle }) => {
  return (
    <Link to={`/book-titles/${bookTitle.id}`} className="BookTitleItem">
      <img className="BookTitleItem-image" alt={bookTitle.name} />
      <div className="BookTitleItem-name">{bookTitle.name}</div>
      <div className="BookTitleItem-genres">
        {bookTitle.genres.map((genre, index) => (
          <span key={index} className="text-xs mr-2 text-indigo-600">
            {genre}
          </span>
        ))}
      </div>
      <div className="BookTitleItem-price">{bookTitle.price.toFixed(2)} €</div>
    </Link>
  );
};
