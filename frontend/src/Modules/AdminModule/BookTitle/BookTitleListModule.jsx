import { Button, ButtonLink } from "../../../Components/Ui/Button";
import {
  ChevronLeftIcon,
  ExternalLinkIcon,
  PencilIcon,
  TrashIcon,
} from "@heroicons/react/outline";
import { createAdminRoute, createRoute } from "../../../routes";
import axios from "axios";
import { createAPI } from "../../../api";
import { useEffect, useState } from "react";

export const BookTitleListModule = () => {
  const [bookTitles, setBookTitles] = useState([]);

  useEffect(() => {
    axios
      .get(createAPI("booktitle"))
      .then((response) => setBookTitles(response.data));
  });

  return (
    <>
      <ButtonLink
        to="/admin"
        variant="secondary"
        icon={<ChevronLeftIcon className="h-6" />}
        text="Back"
      />
      <div className="Content mt-4">
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
              <tr>
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
