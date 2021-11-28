import { Button, ButtonLink } from "../../../Components/Ui/Button";
import {
  BookOpenIcon,
  ChevronLeftIcon,
  PlusIcon,
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

export const BookTitleCreateModule = () => {
  const [alert, setAlert] = useState(null);

  return (
    <>
      <ButtonLink
        to="/admin"
        variant="secondary"
        icon={<ChevronLeftIcon className="h-6 mr-1" />}
        text="Back"
      />
      <div className="Content mt-4">
        <form
          method="post"
          onSubmit={(e) => {
            e.preventDefault();
            const form = new FormData(e.target);
            const collection = {};
            for (let pair of form.entries()) {
              collection[pair[0]] = pair[1];
            }

            axios
              .post(
                createAPI("booktitle"),
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
                  window.scrollTo(0, 0);
                  setAlert({
                    message: "Book Title Created Successfully",
                    type: "success",
                  });
                } else {
                  // Error
                  window.scrollTo(0, 0);
                  setAlert({
                    message: response.data.message,
                    type: "danger",
                  });
                }
              });
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
            placeholder="Example Book"
          />
          <FormControl
            type="text"
            id="author"
            name="author"
            label="Author"
            placeholder="Joe Doe"
          />
          <FormControl
            type="text"
            id="isbn"
            name="isbn"
            label="ISBN"
            placeholder="3232183828"
          />
          <FormControl
            type="text"
            id="date_publication"
            name="date_publication"
            label="Publish Date"
            placeholder="1998"
          />
          <FormControl
            type="text"
            id="publisher"
            name="publisher"
            label="Publisher"
            placeholder="Example Publisher"
          />
          <FormControl
            type="text"
            id="genre"
            name="genre"
            label="Genre"
            placeholder="e.g. Action"
          />
          <FormControl
            type="number"
            id="rating"
            name="rating"
            label="Rating"
            placeholder="10"
          />
          <FormControl
            type="text"
            id="photo"
            name="photo"
            label="Picture"
            placeholder="https://mrtns.eu/tovar/_l/440/l440953.jpg"
          />
          <Textarea
            type="text"
            id="description"
            name="description"
            label="Description"
            placeholder="Lorem ipsum..."
          />

          <div className="flex items-end">
            <Button
              type="submit"
              text="Create"
              variant="green"
              className="ml-auto"
              icon={<PlusIcon className="h-6 mr-1" />}
            />
          </div>
        </form>
      </div>
    </>
  );
};
