import { useEffect, useState } from "react";
import axios from "axios";
import { createAPI } from "../../../api";
import { Button, ButtonLink } from "../../../Components/Ui/Button";
import { createAdminRoute } from "../../../routes";
import {
  ChevronLeftIcon,
  CogIcon,
  PencilIcon,
  PlusIcon,
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

export const LibraryStockModule = () => {
  const [alert, setAlert] = useState(null);
  const [library, setLibrary] = useState({});
  const [stock, setStock] = useState([]);

  const { id } = useParams();

  useEffect(() => {
    axios
      .get(createAPI("library/:id", { id }))
      .then((response) => {
        setLibrary(response.data.data);

        axios
          .get(createAPI("stock/filter"), {
            params: { library_id: response.data.data.id },
          })
          .then((response) => {
            response.data.data.map((stockInfo) => {
              axios
                .get(createAPI("booktitle/:id", { id: stockInfo.booktitle_id }))
                .then((response) => {
                  stockInfo.bookTitle = {
                    name: response.data.data.name,
                    photo: response.data.data.photo,
                  };
                  setStock((state) => [...state, stockInfo]);
                });
            });
          });
      })
      .catch((error) => console.log(error));
  }, [alert]);

  function deleteStock(id) {
    axios
      .delete(createAPI("library/:id", { id }))
      .then((response) => {
        if (response.data.status === "success") {
          // Book Deleted
          window.scrollTo(0, 0);
          setAlert({
            message: "Library Deleted",
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

  console.log(stock);

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
          {library.name}'s Stock {!stock.length ? <PingLoading /> : ""}
        </h1>

        <div className="overflow-auto">
          <Table>
            <Thead>
              <TableRow>
                <TableColHead>Book Title</TableColHead>
                <TableColHead>Availability</TableColHead>
                <TableColHead>Amount</TableColHead>
                <TableColHead>Actions</TableColHead>
              </TableRow>
            </Thead>
            <Tbody>
              {stock.map((item, index) => (
                <TableRow key={index} index={index} striped>
                  <TableCol>
                    <img
                      src={item.bookTitle.photo}
                      alt={item.bookTitle.name}
                      className="h-16 mr-2 inline"
                    />
                    {item.bookTitle.name}
                  </TableCol>
                  <TableCol>
                    {item.availability ? (
                      <span className="text-green-500">Available</span>
                    ) : (
                      <span className="text-red-500">Unavailable</span>
                    )}
                  </TableCol>
                  <TableCol>{item.amount}</TableCol>
                  <TableCol>
                    <div className="flex items-center gap-2">
                      <ButtonLink
                        to={createAdminRoute("LibraryShow", { id: library.id })}
                        variant="primary"
                        icon={<CogIcon className="h-6 mr-0 md:mr-1" />}
                        text="Manage"
                        showText="md"
                      />
                      <ButtonLink
                        to={createAdminRoute("LibraryEdit", { id: library.id })}
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
                        onClick={() => deleteStock(item.id)}
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
