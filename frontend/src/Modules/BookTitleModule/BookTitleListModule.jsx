import { BookTitleItem } from "../../Components/BookTitle/BookTitleItem";
import {
  FilterDropdown,
  FilterDropdownItem,
} from "../../Components/Ui/FilterDropdown";

/**
 * @TODO: Replace select with react-select,
 *        Replace checkboxes with ?react-checkbox?
 */

const BookTitleListModule = () => {
  const bookTitles = [
    {
      id: 1,
      name: "Lorem ipsum",
      genre: "Adventure",
      price: 15.0,
      rating: 4,
    },
    {
      id: 2,
      name: "Lorem ipsum",
      genre: "Adventure",
      price: 15.0,
      rating: 4,
    },
    {
      id: 3,
      name: "Lorem ipsum",
      genre: "Sci-Fi",
      price: 15.0,
      rating: 4,
    },
    {
      id: 4,
      name: "Lorem ipsum",
      genre: "Sci-Fi",
      price: 15.0,
      rating: 4,
    },
    {
      id: 5,
      name: "Lorem ipsum",
      genre: "Action",
      price: 15.0,
      rating: 4,
    },
    {
      id: 6,
      name: "Lorem ipsum",
      genre: "Action",
      price: 15.0,
      rating: 4,
    },
  ];

  const genres = ["Adventure", "Action", "Sci-fi"];

  return (
    <div className="flex flex-row flex-wrap">
      <div className="w-full lg:w-3/12">
        <FilterDropdown>
          <FilterDropdownItem title="Sorting" collapsed>
            <select id="sorting" className="w-full p-2">
              <option value="newest" selected>
                Popular
              </option>
              <option value="newest">Newest</option>
              <option value="newest">Oldest</option>
              <option value="newest">Price Ascending</option>
              <option value="newest">Price Descending</option>
            </select>
          </FilterDropdownItem>
          <FilterDropdownItem title="Genres">
            {genres.map((genre, index) => (
              <div className="inline-block mr-2">
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
