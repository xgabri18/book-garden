import { useEffect, useState } from "react";
import axios from "axios";
import { createAPI } from "../../../api";
import { Button, ButtonLink } from "../../../Components/Ui/Button";
import { createAdminRoute } from "../../../routes";
import {
  CheckIcon,
  ChevronLeftIcon,
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

export const LibraryReservationModule = () => {
  const [reservations, setReservations] = useState([]);
  const [alert, setAlert] = useState(null);
  const { id } = useParams();

  /**
   * Get reservations
   */
  useEffect(() => {
    axios
      .get(createAPI("reservation/of/lib/:id", { id }))
      .then((response) => setReservations(response.data.data))
      .catch((error) => console.log(error));
  }, [id, alert]);

  function confirmReservation(idReservation) {
    axios
      .get(createAPI("reservation/:id", { id: idReservation }))
      .then((response) => {
        if (response.data.status === "success") {
          // Book Deleted
          window.scrollTo(0, 0);
          setAlert({
            message: "Reservation confirmed",
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

  function deleteReservation(idReservation) {
    axios
      .delete(createAPI("reservation/:id", { id: idReservation }))
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
        <h1 className="Content-Title">'s Reservations</h1>

        <div className="overflow-auto">
          <Table>
            <Thead>
              <TableRow>
                <TableColHead>#</TableColHead>
                <TableColHead>User</TableColHead>
                <TableColHead>Book</TableColHead>
                <TableColHead>Date Reservation</TableColHead>
                <TableColHead>Actions</TableColHead>
              </TableRow>
            </Thead>
            <Tbody>
              {reservations.map((reservation, index) => (
                <TableRow key={index} index={index} striped>
                  <TableCol>{reservation.id}</TableCol>
                  <TableCol>{reservation.user}</TableCol>
                  <TableCol>{reservation.book_title}</TableCol>
                  <TableCol>{reservation.date_of_reservation}</TableCol>
                  <TableCol>
                    <div className="flex items-center gap-2">
                      <Button
                        type="button"
                        variant="green"
                        icon={<CheckIcon className="h-6 mr-1" />}
                        text="Confirm"
                        showText="md"
                        onClick={() => confirmReservation(reservation.id)}
                      />
                      <Button
                        type="button"
                        variant="red"
                        icon={<TrashIcon className="h-6 mr-1" />}
                        text="Delete"
                        showText="md"
                        onClick={() => deleteReservation(reservation.id)}
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
