import "./BookTitle.css";
import { Rating } from "../Ui/Rating";

export const BookTitle = ({ bookTitle }) => {
  return (
    <div className="BookTitle">
      <div className="BookTitle-image">
        <img src={bookTitle.photo} alt={bookTitle.name} />
      </div>
      <div className="BookTitle-name">{bookTitle.name}</div>
      <div className="BookTitle-author">{bookTitle.author}</div>
      <div className="w-full flex flex-row justify-between items-center my-2">
        <div className="BookTitle-genre">
          <span className="Link mr-2 transform hover:scale-105 transition duration-200 ease-linear">
            {bookTitle.genre}
          </span>
        </div>
        <div className="BookTitle-rating">
          <Rating rating={bookTitle.rating / 2} className="h-6" />
        </div>
      </div>
      <div className="BookTitle-description">{bookTitle.description}</div>
      <div className="BookTitle-details">
        <div className="font-bold text-lg">Book details:</div>
        <div>
          <b>ISBN:</b> {bookTitle.isbn}
        </div>
        <div>
          <b>Publisher:</b> {bookTitle.publisher}
        </div>
        <div>
          <b>Date Published:</b> {bookTitle.date_publication}
        </div>
      </div>
      <div className="border-b border-gray-200 w-1/2 my-4 m-auto" />
    </div>
  );
};
