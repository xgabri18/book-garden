import { useEffect, useState } from "react";
import axios from "axios";
import { createAPI } from "../../api";
import { ButtonLink } from "../../Components/Ui/Button";
import { ChevronLeftIcon } from "@heroicons/react/outline";
import { Alert } from "../../Components/Ui/Alert";
import { PingLoading } from "../../Components/Ui/PingLoading";
import {
  Table,
  TableCol,
  TableColHead,
  TableRow,
  Tbody,
  Thead,
} from "../../Components/Ui/Table";
import auth from "../../auth";
import { convertDate, convertPrice } from "../../middlewares";

export const AccountBorrowingModule = () => {
  const [borrowings, setBorrowings] = useState([]);
  const [alert, setAlert] = useState(null);

  useEffect(() => {
    setBorrowings([]);

    axios
      .get(createAPI("borrowing/person/:id", { id: auth.id }))
      .then((response) => {
        if (response.data.status === "success") {
          response.data.data.map((borrowing) =>
            axios
              .get(createAPI("stockinfo/:id", { id: borrowing.id }))
              .then((response) => {
                if (response.data.status === "success") {
                  borrowing.stock = response.data.data;
                  setBorrowings((state) => [...state, borrowing]);
                }
              })
          );
        } else {
        }
      })
      .catch((error) => console.log(error));
  }, [alert]);

  return (
    <>
      <div className="flex justify-between">
        <ButtonLink
          to="/account/profile"
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
          Your Borrowings {!borrowings.length ? <PingLoading /> : ""}
        </h1>

        <div className="overflow-auto">
          <Table>
            <Thead>
              <TableRow>
                <TableColHead>#</TableColHead>
                <TableColHead>Library</TableColHead>
                <TableColHead>Book</TableColHead>
                <TableColHead>Date Borrowed</TableColHead>
                <TableColHead>Date Returned</TableColHead>
                <TableColHead>Fine</TableColHead>
              </TableRow>
            </Thead>
            <Tbody>
              {borrowings.map((borrowing, index) => (
                <TableRow key={index} index={index} striped>
                  <TableCol>{borrowing.id}</TableCol>
                  <TableCol>{borrowing.stock.Library_name}</TableCol>
                  <TableCol>{borrowing.stock.Book_title}</TableCol>
                  <TableCol>{convertDate(borrowing.date_borrowed)}</TableCol>
                  <TableCol>{convertDate(borrowing.date_returned)}</TableCol>
                  <TableCol>{convertPrice(borrowing.fine)}</TableCol>
                </TableRow>
              ))}
            </Tbody>
          </Table>
        </div>
      </div>
    </>
  );
};
