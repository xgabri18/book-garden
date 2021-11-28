import { useEffect, useState } from "react";
import axios from "axios";
import { createAPI } from "../../../api";
import { Button, ButtonLink } from "../../../Components/Ui/Button";
import { createAdminRoute } from "../../../routes";
import {
  ChevronLeftIcon,
  PencilIcon,
  TrashIcon,
} from "@heroicons/react/outline";
import { Alert } from "../../../Components/Ui/Alert";
import {
  Table,
  TableCol,
  TableColHead,
  TableRow,
  Tbody,
  Thead,
} from "../../../Components/Ui/Table";
import { useParams } from "react-router-dom";

export const LibraryBorrowingModule = () => {
  const [borrowings, setBorrowings] = useState([]);
  const [library, setLibrary] = useState({});
  const [alert, setAlert] = useState(null);
  const { id } = useParams();

  /**
   * Get reservations
   */
  useEffect(() => {
    axios
      .get(createAPI("borrowing/of/lib/:id", { id }))
      .then((response) => setBorrowings(response.data.data))
      .catch((error) => console.log(error));

    axios
      .get(createAPI("library/:id", { id }))
      .then((response) => setLibrary(response.data.data))
      .catch((error) => console.log(error));
  }, [id, alert]);

  function deleteBorrowing(idBorrowing) {
    axios
      .delete(createAPI("borrowing/:id", { idBorrowing }))
      .then((response) => {
        if (response.data.status === "success") {
          // Borrowing Deleted
          window.scrollTo(0, 0);
          setAlert({
            message: "Borrowing deleted",
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
      })
      .catch((error) => console.log(error));
  }

  return (
    <>
      <div className="flex justify-between">
        <ButtonLink
          to={createAdminRoute("LibraryShow", { id })}
          variant="secondary"
          icon={<ChevronLeftIcon className="h-6 mr-1" />}
          text="Back"
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
        <h1 className="Content-Title">{library.name}'s Borrowings</h1>

        <div className="overflow-auto">
          <Table>
            <Thead>
              <TableRow>
                <TableColHead>#</TableColHead>
                <TableColHead>User</TableColHead>
                <TableColHead>Book</TableColHead>
                <TableColHead>Date Borrowed</TableColHead>
                <TableColHead>Date To Return</TableColHead>
                <TableColHead>Fine</TableColHead>
                <TableColHead>Actions</TableColHead>
              </TableRow>
            </Thead>
            <Tbody>
              {borrowings.map((borrowing, index) => (
                <TableRow key={index} index={index} striped>
                  <TableCol>{borrowing.id}</TableCol>
                  <TableCol>{borrowing.user}</TableCol>
                  <TableCol>{borrowing.book_title}</TableCol>
                  <TableCol>{borrowing.date_borrowed}</TableCol>
                  <TableCol>{borrowing.date_returned}</TableCol>
                  <TableCol>{borrowing.fine}</TableCol>
                  <TableCol>
                    <div className="flex items-center gap-2">
                      <ButtonLink
                        to={createAdminRoute("LibraryBorrowingEdit", {
                          idLibrary: library.id,
                          idBorrowing: borrowing.id,
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
                        onClick={() => deleteBorrowing(borrowing.id)}
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
