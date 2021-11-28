import { Button, ButtonLink } from "../../../Components/Ui/Button";
import {
  BookOpenIcon,
  ChevronLeftIcon,
  SaveIcon,
} from "@heroicons/react/outline";
import FormControl from "../../../Components/Forms/FormControl";
import axios from "axios";
import { createAPI } from "../../../api";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Textarea from "../../../Components/Forms/Textarea";
import qs from "querystring";
import { Alert } from "../../../Components/Ui/Alert";
import ReactDOM from "react-dom";

export const BookTitleEditModule = () => {
  const { id } = useParams();
  const [bookTitle, setBookTitle] = useState([]);

  useEffect(() => {
    axios
      .get(createAPI("booktitle/:id", { id }))
      .then((response) => setBookTitle(response.data));
  });

  return (
    <>
      <ButtonLink
        to="/admin/book-titles"
        variant="secondary"
        icon={<ChevronLeftIcon className="h-6" />}
        text="Back"
      />
      <div className="Content mt-4">
        <div className="flex items-center">
          <div className="w-6/12 text-center">
            {/*<BookOpenIcon className="mx-auto h-32 bg-indigo-600 text-white rounded-full p-4" />*/}
            <img
              src={bookTitle.photo}
              alt={bookTitle.name}
              className="h-64 inline"
            />
            <div className="my-4 text-2xl text-center font-bold">
              {bookTitle.name}
            </div>
            <div className="italic text-center">{bookTitle.author}</div>
          </div>
          <form
            method="post"
            className="w-6/12"
            onSubmit={(e) => {
              e.preventDefault();
              const form = new FormData(e.target);
              const collection = {};
              for (let pair of form.entries()) {
                collection[pair[0]] = pair[1];
              }

              axios
                .put(
                  createAPI("booktitle/:id", { id: bookTitle.id }),
                  qs.stringify({
                    name: collection.name,
                    author: collection.author,
                    publisher: collection.publisher,
                    isbn: collection.isbn,
                    genre: collection.genre,
                    description: collection.description,
                    rating: collection.rating,
                    photo: collection.photo,
                    date_publication: collection.date_publication,
                  })
                )
                .then((response) => {
                  if (response.data.status === "success") {
                    // Edited
                    console.log(response.data);
                  } else {
                    // Error
                    ReactDOM.render(
                      <Alert
                        className="block"
                        message={response.data.message}
                        type="danger"
                        closeable
                      />,
                      document.getElementById("validation")
                    );
                  }
                });
            }}
          >
            <div id="validation" />
            <FormControl
              type="text"
              id="name"
              name="name"
              label="Book Name"
              value={bookTitle.name}
              placeholder="Example Book"
            />
            <FormControl
              type="text"
              id="author"
              name="author"
              label="Author"
              value={bookTitle.author}
              placeholder="Joe Doe"
            />
            <FormControl
              type="text"
              id="isbn"
              name="isbn"
              label="ISBN"
              value={bookTitle.isbn}
              placeholder="3232183828"
            />
            <FormControl
              type="text"
              id="date_publication"
              name="date_publication"
              value={bookTitle.date_publication}
              label="Publish Date"
            />
            <FormControl
              type="text"
              id="publisher"
              name="publisher"
              label="Publisher"
              value={bookTitle.publisher}
              placeholder="Example Publisher"
            />
            <FormControl
              type="text"
              id="genre"
              name="genre"
              label="Genre"
              value={bookTitle.genre}
              placeholder="e.g. Action"
            />
            <FormControl
              type="number"
              id="rating"
              name="rating"
              label="Rating"
              value={bookTitle.rating}
              placeholder="10"
            />
            <FormControl
              type="text"
              id="photo"
              name="photo"
              label="Picture"
              value={bookTitle.photo}
              placeholder="https://mrtns.eu/tovar/_l/440/l440953.jpg"
            />
            <Textarea
              type="text"
              id="description"
              name="description"
              label="Description"
              value={bookTitle.description}
              placeholder="https://mrtns.eu/tovar/_l/440/l440953.jpg"
            />

            <div className="flex items-end">
              <Button
                type="submit"
                text="Save"
                variant="primary"
                className="ml-auto"
                icon={<SaveIcon className="h-6 mr-1" />}
              />
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
