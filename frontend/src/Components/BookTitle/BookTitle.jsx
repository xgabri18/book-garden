import "./BookTitle.css";
import { Link } from "react-router-dom";
import { Rating } from "../Ui/Rating";
import { ButtonLink } from "../Ui/Button";

export const BookTitle = ({ bookTitle }) => {
  return (
    <div className="BookTitle">
      <div className="BookTitle-image">
        <img src={bookTitle.image} alt={bookTitle.name} />
      </div>
      <div className="w-full flex flex-row justify-between items-center my-2">
        <div className="BookTitle-name">{bookTitle.name}</div>
        <div className="BookTitle-price">{bookTitle.price.toFixed(2)} €</div>
      </div>
      <div className="w-full flex flex-row justify-between items-center my-2">
        <div className="BookTitle-genres">
          {bookTitle.genres.map((genre, index) => (
            <Link
              to={`/genre/${genre}`}
              key={index}
              className="Link mr-2 transform hover:scale-105 transition duration-200 ease-linear"
            >
              {genre}
            </Link>
          ))}
        </div>
        <div className="BookTitle-rating">
          <Rating rating={bookTitle.rating} className="h-6" />
        </div>
      </div>
      <div className="BookTitle-description">{bookTitle.description}</div>
      <div className="border-b border-gray-200 w-1/2 my-4 m-auto" />
      <div className="BookTitle-libraries">
        {bookTitle.libraries.map((library, index) => (
          <div key={index} className="flex justify-between">
            <div className="text-lg font-bold">{library}</div>
            <ButtonLink to="/" variant="primary" size="sm" text="Order" />
          </div>
        ))}
      </div>
    </div>
  );
};
