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

export const LibraryReservationsModule = () => {
  const [alert, setAlert] = useState(null);
  const [reservations, setReservations] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(createAPI("reservation/of/lib/:id", { id }))
      .then((response) => setReservations(response.data.data))
      .catch((error) => console.log(error));
  }, [alert]);

  function deleteReservation(id) {
    axios
      .delete(createAPI("reservation/:id", { id }))
      .then((response) => {
        if (response.data.status === "success") {
          // Book Deleted
          window.scrollTo(0, 0);
          setAlert({
            message: "Reservation deleted",
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
        <h1 className="Content-Title">Libraries</h1>

        <div className="overflow-auto">
          <Table>
            <Thead>
              <TableRow>
                <TableColHead>#</TableColHead>
                <TableColHead>Address</TableColHead>
                <TableColHead>Actions</TableColHead>
              </TableRow>
            </Thead>
            <Tbody>
              {reservations.map((library, index) => (
                <TableRow key={index} index={index} striped>
                  <TableCol>{library.name}</TableCol>
                  <TableCol>
                    <div className="font-bold">{library.city}</div>
                    <div className="hidden lg:block">{library.street}</div>
                  </TableCol>
                  <TableCol>
                    <div className="flex items-center gap-2">
                      <ButtonLink
                        to={createAdminRoute("LibraryShow", { id: library.id })}
                        variant="primary"
                        icon={<CogIcon className="h-6 mr-1" />}
                        text="Manage"
                        showText="md"
                      />
                      <ButtonLink
                        to={createAdminRoute("LibraryEdit", { id: library.id })}
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
                        onClick={() => deleteReservation(library.id)}
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
