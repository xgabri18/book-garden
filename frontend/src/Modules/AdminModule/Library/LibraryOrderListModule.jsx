import { useEffect, useState } from "react";
import axios from "axios";
import { createAPI } from "../../../api";
import { ButtonLink } from "../../../Components/Ui/Button";
import { createAdminRoute } from "../../../routes";
import {
  ChevronLeftIcon,
  PencilIcon,
  PlusIcon,
} from "@heroicons/react/outline";
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
import { useParams } from "react-router-dom";

export const LibraryOrderListModule = () => {
  const [alert, setAlert] = useState(null);
  const [orders, setOrders] = useState([]);
  const [library, setLibrary] = useState({});

  const { id } = useParams();

  useEffect(() => {
    setOrders([]);

    axios
      .get(createAPI("library/:id", { id }))
      .then((response) => setLibrary(response.data.data))
      .catch((error) => console.log(error));

    axios
      .get(createAPI("order/library/:id", { id }))
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
  }, [id, alert]);

  return (
    <>
      <div className="flex justify-between">
        <ButtonLink
          to={createAdminRoute("LibraryShow", { id })}
          variant="secondary"
          icon={<ChevronLeftIcon className="h-6 mr-0 md:mr-1" />}
          text="Back"
        />
        <ButtonLink
          to={createAdminRoute("LibraryOrderCreate", { id })}
          variant="green"
          icon={<PlusIcon className="h-6 mr-0 md:mr-1" />}
          text="New Order"
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
          {library.name}'s Orders {!orders.length ? <PingLoading /> : ""}
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
                      <ButtonLink
                        to={createAdminRoute("LibraryOrderEdit", {
                          idLibrary: id,
                          idOrder: order.id,
                        })}
                        variant="yellow"
                        icon={<PencilIcon className="h-6 mr-0 md:mr-1" />}
                        text="Edit"
                        showText="md"
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
