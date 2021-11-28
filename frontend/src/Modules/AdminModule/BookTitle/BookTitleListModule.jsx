import { Button, ButtonLink } from "../../../Components/Ui/Button";
import {
  ChevronLeftIcon,
  ExternalLinkIcon,
  PencilIcon,
  PlusIcon,
  TrashIcon,
} from "@heroicons/react/outline";
import { createAdminRoute, createRoute } from "../../../routes";
import axios from "axios";
import { createAPI } from "../../../api";
import { useEffect, useState } from "react";
import { Alert } from "../../../Components/Ui/Alert";

export const BookTitleListModule = () => {
  const [alert, setAlert] = useState(null);
  const [bookTitles, setBookTitles] = useState([]);

  useEffect(() => {
    axios
      .get(createAPI("booktitle"))
      .then((response) => setBookTitles(response.data.data));
  }, [alert]);

  function deleteBook(id) {
    axios.delete(createAPI("booktitle/:id", { id })).then((response) => {
      if (response.data.status === "success") {
        // Book Deleted
        window.scrollTo(0, 0);
        setAlert({
          message: "Book Title Deleted",
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
  }

  return (
    <>
      <div className="flex justify-between">
        <ButtonLink
          to="/admin"
          variant="secondary"
          icon={<ChevronLeftIcon className="h-6 mr-1" />}
          text="Back"
        />
        <ButtonLink
          to={createAdminRoute("BookTitleCreate")}
          variant="green"
          icon={<PlusIcon className="h-6 mr-1" />}
          text="New Book"
        />
      </div>
      <div className="Content mt-4">
        {alert && (
          <Alert
            message={alert.message}
            type={alert.type}
            onClick={() => setAlert(null)}
          />
        )}
        <h1 className="Content-Title">Book titles</h1>

        <table className="table-auto w-full">
          <thead>
            <tr className="text-left">
              <th>#</th>
              <th />
              <th>Name</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {bookTitles.map((bookTitle, index) => (
              <tr key={index}>
                <td>{bookTitle.id}</td>
                <td className="w-2/12">
                  <img
                    src={bookTitle.photo}
                    alt={bookTitle.name}
                    className="h-16"
                  />
                </td>
                <td>{bookTitle.name}</td>
                <td className="w-1/4">
                  <div className="flex items-center gap-2">
                    {/*TODO: Set book title dynamically to button links*/}
                    <ButtonLink
                      to={`/book-titles/` + bookTitle.id}
                      variant="primary"
                      icon={<ExternalLinkIcon className="h-6 mr-1" />}
                      text="Open"
                      hideTextSm
                      target="_blank"
                    />
                    <ButtonLink
                      to={createAdminRoute("BookTitleEdit", {
                        id: bookTitle.id,
                      })}
                      variant="yellow"
                      icon={<PencilIcon className="h-6 mr-1" />}
                      text="Edit"
                      hideTextSm
                    />
                    <Button
                      type="button"
                      variant="red"
                      icon={<TrashIcon className="h-6 mr-1" />}
                      text="Delete"
                      hideTextSm
                      onClick={() => deleteBook(bookTitle.id)}
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};
