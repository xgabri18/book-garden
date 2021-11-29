import { useEffect, useState } from "react";
import axios from "axios";
import { createAPI } from "../../../api";
import { Button, ButtonLink } from "../../../Components/Ui/Button";
import { createAdminRoute } from "../../../routes";
import { CheckIcon, ChevronLeftIcon } from "@heroicons/react/outline";
import { Alert } from "../../../Components/Ui/Alert";
import { PingLoading } from "../../../Components/Ui/PingLoading";
import {
  Table,
  TableCol,
  TableColHead,
  TableRow,
  Tbody,
  Thead,
} from "../../../Components/Ui/Table";

export const OrderList = () => {
  const [alert, setAlert] = useState(null);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    setOrders([]);

    axios
      .get(createAPI("order"))
      .then((response) => {
        response.data.data.map((order) =>
          axios
            .all([
              axios.get(createAPI("booktitle/:id", { id: order.booktitle_id })),
              axios.get(createAPI("library/:id", { id: order.library_id })),
            ])
            .then(
              axios.spread((bookTitle, library) => {
                if (
                  bookTitle.data.status === "success" &&
                  library.data.status === "success"
                ) {
                  order.bookTitle = bookTitle.data.data.name;
                  order.library = library.data.data.name;
                  setOrders((state) => [...state, order]);
                } else {
                  console.log(bookTitle.data, library.data);
                }
              })
            )
        );
      })
      .catch((error) => console.log(error));
  }, [alert]);

  function confirmOrder(id) {
    axios
      .get(createAPI("order/confirm/:id", { id }))
      .then((response) => {
        if (response.data.status === "success") {
          // Book Deleted
          window.scrollTo(0, 0);
          setAlert({
            message: "Order confirmed",
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
          to={createAdminRoute("Dashboard")}
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

        <h1 className="Content-Title">
          Orders {!orders.length ? <PingLoading /> : ""}
        </h1>

        <div className="overflow-auto">
          <Table>
            <Thead>
              <TableRow>
                <TableColHead>Library</TableColHead>
                <TableColHead>Book</TableColHead>
                <TableColHead>Amount</TableColHead>
                <TableColHead>Date Added</TableColHead>
                <TableColHead>Note</TableColHead>
                <TableColHead>Actions</TableColHead>
              </TableRow>
            </Thead>
            <Tbody>
              {orders.map((order, index) => (
                <TableRow key={index} index={index} striped>
                  <TableCol>{order.library}</TableCol>
                  <TableCol>{order.bookTitle}</TableCol>
                  <TableCol>{order.amount}</TableCol>
                  <TableCol>{order.date_added}</TableCol>
                  <TableCol>{order.note}</TableCol>
                  <TableCol>
                    <div className="flex items-center gap-2">
                      <Button
                        type="button"
                        variant="green"
                        icon={<CheckIcon className="h-6 mr-0 md:mr-1" />}
                        text="Confirm"
                        showText="md"
                        onClick={() => confirmOrder(order.id)}
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
