import { BookTitleItem } from "../../Components/BookTitle/BookTitleItem";
import {
  FilterDropdown,
  FilterDropdownItem,
} from "../../Components/Ui/FilterDropdown";
import axios from "axios";
import { useEffect, useState } from "react";
import { createAPI } from "../../api";

/**
 * @TODO: Replace select with react-select,
 *        Replace checkboxes with ?react-checkbox?
 */

const BookTitleListModule = () => {
  const [bookTitles, setBookTitles] = useState([]);
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    axios
      .get(createAPI("booktitle"))
      .then((response) => setBookTitles(response.data.data))
      .catch((error) => console.log(error));

    axios
      .get(createAPI("booktitle/unique/genres"))
      .then((response) => setGenres(response.data.data))
      .catch((error) => console.log(error));
  }, []);

  return (
    <div className="flex flex-row flex-wrap">
      <div className="w-full lg:w-3/12">
        <FilterDropdown>
          <FilterDropdownItem title="Sorting" collapsed>
            <select id="sorting" className="w-full p-2">
              <option value="newest">Popular</option>
              <option value="newest">Newest</option>
              <option value="newest">Oldest</option>
              <option value="newest">Price Ascending</option>
              <option value="newest">Price Descending</option>
            </select>
          </FilterDropdownItem>
          <FilterDropdownItem title="Genres">
            {genres.map((genre, index) => (
              <div className="block mr-2" key={index}>
                <input type="checkbox" id={`genre-${index}`} className="mr-1" />
                <label htmlFor={`genre-${index}`}>{genre}</label>
              </div>
            ))}
          </FilterDropdownItem>
          <FilterDropdownItem title="Authors">
            <select id="sorting" className="w-full p-2">
              <option defaultChecked>Select Author</option>
            </select>
          </FilterDropdownItem>
          <FilterDropdownItem title="Libraries">
            <b>Select box</b> with libraries
          </FilterDropdownItem>
          <FilterDropdownItem title="Rating">
            <b>Select rating</b>
          </FilterDropdownItem>
        </FilterDropdown>
      </div>
      <div className="w-full lg:w-9/12 flex flex-row flex-wrap content-start">
        {bookTitles.map((bookTitle, index) => (
          <div className="p-2 w-6/12 lg:w-4/12 xl:w-3/12 h-auto" key={index}>
            <BookTitleItem bookTitle={bookTitle} key={index} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookTitleListModule;
