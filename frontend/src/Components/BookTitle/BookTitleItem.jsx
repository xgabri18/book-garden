import "./BookTitleItem.css";
import { Link } from "react-router-dom";

export const BookTitleItem = ({ bookTitle }) => {
  return (
    <Link to={`/book-titles/${bookTitle.id}`} className="BookTitleItem">
      <img
        className="BookTitleItem-image"
        src={bookTitle.photo}
        alt={bookTitle.name}
      />
      <div className="BookTitleItem-name">{bookTitle.name}</div>
      <div className="BookTitleItem-genre">{bookTitle.genre}</div>
      {/*{bookTitle.availibility ? "CAN RESERVE" : "CAN VOTE"}*/}
    </Link>
  );
};
