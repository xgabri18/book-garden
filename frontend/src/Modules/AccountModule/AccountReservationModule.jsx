import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { createAPI } from "../../api";
import { Button, ButtonLink } from "../../Components/Ui/Button";
import { ChevronLeftIcon, TrashIcon } from "@heroicons/react/outline";
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

export const AccountReservationModule = () => {
  const [reservations, setReservations] = useState([]);
  const [alert, setAlert] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    setReservations([]);

    axios
      .get(createAPI("reservation/person/:id", { id: auth.id }))
      .then((response) => {
        response.data.data.map((reservation) =>
          axios
            .get(createAPI("stockinfo/:id", { id: reservation.stock_id }))
            .then((response) => {
              if (response.data.status === "success") {
                reservation.stock = response.data.data;
                setReservations((state) => [...state, reservation]);
              }
            })
        );
      })
      .catch((error) => console.log(error));
  }, [id, alert]);

  function deleteReservation(idReservation) {
    axios
      .delete(createAPI("reservation/:id", { id: idReservation }))
      .then((response) => {
        if (response.data.status === "success") {
          window.scrollTo(0, 0);
          setAlert({
            message: "Reservation deleted",
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
          to={"/account/profile"}
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
          Your Reservations {!reservations.length ? <PingLoading /> : ""}
        </h1>

        <div className="overflow-auto">
          <Table>
            <Thead>
              <TableRow>
                <TableColHead>#</TableColHead>
                <TableColHead>Library</TableColHead>
                <TableColHead>Book</TableColHead>
                <TableColHead>Date Reservation</TableColHead>
                <TableColHead>Actions</TableColHead>
              </TableRow>
            </Thead>
            <Tbody>
              {reservations.map((reservation, index) => (
                <TableRow key={index} index={index} striped>
                  <TableCol>{reservation.id}</TableCol>
                  <TableCol>{reservation.stock.Library_name}</TableCol>
                  <TableCol>{reservation.stock.Book_title}</TableCol>
                  <TableCol>{reservation.date_of_reservation}</TableCol>
                  <TableCol>
                    <div className="flex items-center gap-2">
                      <Button
                        type="button"
                        variant="red"
                        icon={<TrashIcon className="h-6 mr-0 md:mr-1" />}
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
