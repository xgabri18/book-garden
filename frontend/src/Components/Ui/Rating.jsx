import { StarIcon } from "@heroicons/react/solid";
import { useState } from "react";

export const Rating = ({ rating, className }) => {
  const stars = [];
  const emptyStars = [];

  rating = Math.ceil(rating);

  const [hoveredItem, setHoveredItem] = useState(null);

  for (let i = 0; i < rating; i++) {
    stars.push(
      <StarIcon
        key={i}
        onMouseEnter={() => setHoveredItem(i)}
        onMouseLeave={() => setHoveredItem(null)}
        className={`${className} transition duration-200 ease-linear cursor-pointer transform ${
          hoveredItem != null && hoveredItem >= i && "scale-125 text-yellow-400"
        } ${
          hoveredItem != null && hoveredItem <= i
            ? "text-gray-400"
            : "text-yellow-400"
        }`}
      />
    );
  }

  if (rating < 5) {
    for (let i = rating; i < 5; i++) {
      emptyStars.push(
        <StarIcon
          key={i}
          onMouseEnter={() => setHoveredItem(i)}
          onMouseLeave={() => setHoveredItem(null)}
          className={`${className} transition duration-200 ease-linear cursor-pointer transform ${
            hoveredItem != null && hoveredItem >= i
              ? "scale-125 text-yellow-400"
              : ""
          }`}
        />
      );
    }
  }

  return (
    <>
      {stars}
      {emptyStars}
    </>
  );
};
