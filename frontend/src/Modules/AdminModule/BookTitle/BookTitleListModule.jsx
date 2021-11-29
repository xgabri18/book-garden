import { Button, ButtonLink } from "../../../Components/Ui/Button";
import {
  ChevronLeftIcon,
  ExternalLinkIcon,
  PencilIcon,
  PlusIcon,
  TrashIcon,
} from "@heroicons/react/outline";
import { createAdminRoute } from "../../../routes";
import axios from "axios";
import { createAPI } from "../../../api";
import { useEffect, useState } from "react";
import { Alert } from "../../../Components/Ui/Alert";
import {
  Table,
  TableCol,
  TableColHead,
  TableRow,
  Tbody,
  Thead,
} from "../../../Components/Ui/Table";
import { PingLoading } from "../../../Components/Ui/PingLoading";

export const BookTitleListModule = () => {
  const [alert, setAlert] = useState(null);
  const [bookTitles, setBookTitles] = useState([]);

  useEffect(() => {
    axios
      .get(createAPI("booktitle"))
      .then((response) => setBookTitles(response.data.data))
      .catch((error) => console.log(error));
  }, [alert]);

  function deleteBook(id) {
    axios
      .delete(createAPI("booktitle/:id", { id }))
      .then((response) => {
        if (response.data.status === "success") {
          window.scrollTo(0, 0);
          setAlert({
            message: "Book Title Deleted",
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
  }

  return (
    <>
      <div className="flex justify-between">
        <ButtonLink
          to={createAdminRoute("Dashboard")}
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
        <h1 className="Content-Title">
          Book titles {!bookTitles.length ? <PingLoading /> : ""}
        </h1>

        <div className="overflow-auto">
          <Table>
            <Thead>
              <TableRow>
                <TableColHead className="w-1/6" />
                <TableColHead>Name</TableColHead>
                <TableColHead className="w-1/4">Actions</TableColHead>
              </TableRow>
            </Thead>
            <Tbody>
              {bookTitles.map((bookTitle, index) => (
                <TableRow key={index} index={index} striped>
                  <TableCol>
                    <img
                      src={bookTitle.photo}
                      alt={bookTitle.name}
                      className="h-16"
                    />
                  </TableCol>
                  <TableCol>{bookTitle.name}</TableCol>
                  <TableCol>
                    <div className="flex items-center gap-2">
                      <ButtonLink
                        to={`/book-titles/` + bookTitle.id}
                        variant="primary"
                        icon={<ExternalLinkIcon className="h-6 mr-1" />}
                        text="Open"
                        showText="md"
                        target="_blank"
                      />
                      <ButtonLink
                        to={createAdminRoute("BookTitleEdit", {
                          id: bookTitle.id,
                        })}
                        variant="yellow"
                        icon={<PencilIcon className="h-6 mr-1" />}
                        text="Edit"
                        showText="md"
                      />
                      <Button
                        type="button"
                        variant="red"
                        icon={<TrashIcon className="h-6 mr-1" />}
                        text="Delete"
                        showText="md"
                        onClick={() => deleteBook(bookTitle.id)}
                      />
                    </div>
                  </TableCol>
                </TableRow>
              ))}
            </Tbody>
          </Table>
        </div>
      </div>
    </>
  );
};
