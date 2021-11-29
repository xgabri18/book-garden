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
import { PingLoading } from "../../../Components/Ui/PingLoading";
import { convertDate, convertPrice } from "../../../middlewares";

export const LibraryBorrowingModule = () => {
  const [borrowings, setBorrowings] = useState([]);
  const [library, setLibrary] = useState({});
  const [alert, setAlert] = useState(null);
  const { id } = useParams();

  /**
   * Get reservations
   */
  useEffect(() => {
    setBorrowings([]);

    axios
      .get(createAPI("borrowing/of/lib/:id", { id }))
      .then((response) => {
        response.data.data.map((borrowing) =>
          axios
            .all([
              axios.get(createAPI("person/:id", { id: borrowing.person_id })),
              axios.get(createAPI("stockinfo/:id", { id: borrowing.stock_id })),
            ])
            .then(
              axios.spread((person, stockinfo) => {
                if (
                  person.data.status === "success" &&
                  stockinfo.data.status === "success"
                ) {
                  borrowing.user =
                    person.data.data.name + " " + person.data.data.surname;
                  borrowing.bookTitle = stockinfo.data.data.Book_title;
                  setBorrowings((state) => [...state, borrowing]);
                } else {
                  console.log(person.data, stockinfo.data);
                }
              })
            )
        );
      })
      .catch((error) => console.log(error));

    axios
      .get(createAPI("library/:id", { id }))
      .then((response) => setLibrary(response.data.data))
      .catch((error) => console.log(error));
  }, [id, alert]);

  function deleteBorrowing(idBorrowing) {
    axios
      .delete(createAPI("borrowing/:id", { id: idBorrowing }))
      .then((response) => {
        if (response.data.status === "success") {
          window.scrollTo(0, 0);
          setAlert({
            message: "Borrowing deleted",
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
          to={createAdminRoute("LibraryShow", { id })}
          variant="secondary"
          icon={<ChevronLeftIcon className="h-6 mr-0 md:mr-1" />}
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
        <h1 className="Content-Title relative">
          {library.name}'s Borrowings{" "}
          {!borrowings.length ? <PingLoading /> : ""}
        </h1>

        <div className="overflow-auto">
          <Table>
            <Thead>
              <TableRow>
                <TableColHead className="w-3/12">User</TableColHead>
                <TableColHead className="w-3/12">Book</TableColHead>
                <TableColHead>Date Borrowed</TableColHead>
                <TableColHead>Date To Return</TableColHead>
                <TableColHead className="w-3/12">Fine</TableColHead>
                <TableColHead>Actions</TableColHead>
              </TableRow>
            </Thead>
            <Tbody>
              {borrowings.map((borrowing, index) => (
                <TableRow key={index} index={index} striped>
                  <TableCol>{borrowing.user}</TableCol>
                  <TableCol>{borrowing.bookTitle}</TableCol>
                  <TableCol>{convertDate(borrowing.date_borrowed)}</TableCol>
                  <TableCol>{convertDate(borrowing.date_returned)}</TableCol>
                  <TableCol>{convertPrice(borrowing.fine)}</TableCol>
                  <TableCol>
                    <div className="flex items-center gap-2">
                      <ButtonLink
                        to={createAdminRoute("LibraryBorrowingEdit", {
                          idLibrary: library.id,
                          idBorrowing: borrowing.id,
                        })}
                        variant="yellow"
                        icon={<PencilIcon className="h-6 mr-0 md:mr-1" />}
                        text="Edit"
                        showText="md"
                      />
                      <Button
                        type="button"
                        variant="red"
                        icon={<TrashIcon className="h-6 mr-0 md:mr-1" />}
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
