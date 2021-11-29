import { Button, ButtonLink } from "../../../Components/Ui/Button";
import { ChevronLeftIcon, SaveIcon } from "@heroicons/react/outline";
import FormControl from "../../../Components/Forms/FormControl";
import axios from "axios";
import { createAPI } from "../../../api";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Textarea from "../../../Components/Forms/Textarea";
import qs from "querystring";
import { Alert } from "../../../Components/Ui/Alert";

export const BookTitleEditModule = () => {
  const { id } = useParams();
  const [bookTitle, setBookTitle] = useState([]);
  const [alert, setAlert] = useState(null);

  useEffect(() => {
    axios
      .get(createAPI("booktitle/:id", { id }))
      .then((response) => setBookTitle(response.data.data))
      .catch((error) => console.log(error));
  }, [id, alert]);

  return (
    <>
      <ButtonLink
        to="/admin/book-titles"
        variant="secondary"
        icon={<ChevronLeftIcon className="h-6 mr-1" />}
        text="Back"
      />
      <div className="Content mt-4">
        <div className="flex flex-col lg:flex-row items-center">
          <div className="w-full lg:w-6/12 mb-8 lg:mb-0 text-center">
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
            className="w-full lg:w-6/12"
            onSubmit={(e) => {
              e.preventDefault();
              const form = new FormData(e.target);
              const data = {};
              for (let pair of form.entries()) {
                data[pair[0]] = pair[1];
              }

              axios
                .put(
                  createAPI("booktitle/:id", { id: bookTitle.id }),
                  qs.stringify({ ...data })
                )
                .then((response) => {
                  if (response.data.status === "success") {
                    window.scrollTo(0, 0);
                    setAlert({
                      message: "Book Title Edited Successfully",
                      type: "success",
                    });
                  } else {
                    window.scrollTo(0, 0);
                    setAlert({
                      message: response.data.message,
                      type: "danger",
                    });
                  }
                })
                .catch((error) => console.log(error));
            }}
          >
            {alert && (
              <Alert
                message={alert.message}
                type={alert.type}
                onClick={() => setAlert(null)}
              />
            )}

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
              placeholder="1998"
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
              placeholder="Lorem ipsum..."
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
