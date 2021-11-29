import { BookTitleItem } from "../../Components/BookTitle/BookTitleItem";
import {
  FilterDropdown,
  FilterDropdownItem,
} from "../../Components/Ui/FilterDropdown";
import axios from "axios";
import { useEffect, useState } from "react";
import { createAPI } from "../../api";
import Select from "react-select";
import { Button } from "../../Components/Ui/Button";

const BookTitleListModule = () => {
  const [bookTitles, setBookTitles] = useState([]);
  const [genres, setGenres] = useState([]);
  const [authors, setAuthors] = useState([]);
  const [libraries, setLibraries] = useState([]);
  const [filters, setFilters] = useState({});

  useEffect(() => {
    setBookTitles([]);
    setGenres([]);
    setAuthors([]);
    setLibraries([]);

    axios
      .get(createAPI("booktitle"))
      .then((response) => {
        if (response.data.status === "success") {
          response.data.data.map((bookTitle) =>
            axios
              .get(createAPI("stock/filter"), {
                params: { booktitle_id: bookTitle.id, ...filters },
              })
              .then((response) => {
                if (response.data.data.length > 0) {
                  bookTitle.availability = !!response.data.data.find(
                    (s) => s.availability === true
                  );
                  bookTitle.stock = response.data.data;
                  setBookTitles((state) => [...state, bookTitle]);
                }
              })
          );
        }
      })
      .catch((error) => console.log(error));

    axios
      .get(createAPI("booktitle/unique/genres"))
      .then((response) =>
        response.data.data.map((genre) =>
          setGenres((state) => [...state, { value: genre, label: genre }])
        )
      )
      .catch((error) => console.log(error));

    axios
      .get(createAPI("booktitle/unique/authors"))
      .then((response) =>
        response.data.data.map((author) =>
          setAuthors((state) => [...state, { value: author, label: author }])
        )
      )
      .catch((error) => console.log(error));

    axios
      .get(createAPI("library"))
      .then((response) =>
        response.data.data.map((library) =>
          setLibraries((state) => [
            ...state,
            { value: library.id, label: library.name },
          ])
        )
      )
      .catch((error) => console.log(error));
  }, [filters]);

  function generateFilter(form) {
    const formData = new FormData(form);
    const data = {};

    for (let pair of formData.entries()) {
      if (pair[1] !== "") {
        data[pair[0]] = pair[1];
      }
    }

    setFilters(data);
  }

  return (
    <div className="flex flex-row flex-wrap">
      <form
        method="get"
        className="w-full lg:w-3/12"
        onSubmit={(e) => {
          e.preventDefault();
          generateFilter(e.target);
        }}
      >
        <FilterDropdown>
          <FilterDropdownItem title="Genres" collapsed>
            <Select
              defaultValue={{
                value: null,
                label: "Choose Genre",
              }}
              name="genre"
              options={genres}
            />
          </FilterDropdownItem>
          <FilterDropdownItem title="Authors" collapsed>
            <Select
              defaultValue={{
                value: null,
                label: "Choose Author",
              }}
              name="author"
              options={authors}
            />
          </FilterDropdownItem>
          <FilterDropdownItem title="Libraries" collapsed>
            <Select
              defaultValue={{
                value: null,
                label: "Choose Library",
              }}
              name="library_id"
              options={libraries}
            />
          </FilterDropdownItem>
          <FilterDropdownItem title="Availability" collapsed>
            <Select
              defaultValue={{
                value: null,
                label: "Choose Availability",
              }}
              name="availability"
              options={[
                { value: true, label: "Available" },
                { value: false, label: "Not Available" },
              ]}
            />
          </FilterDropdownItem>
        </FilterDropdown>

        <div className="flex justify-between mt-4">
          <Button type="submit" text="Apply Filters" variant="secondary" />
          <Button
            type="button"
            text="Reset Filters"
            variant="red-light"
            onClick={() => {
              window.location.href = "/book-titles";
            }}
          />
        </div>
      </form>
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
