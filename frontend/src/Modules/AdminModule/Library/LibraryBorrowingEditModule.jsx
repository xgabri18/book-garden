import { Button, ButtonLink } from "../../../Components/Ui/Button";
import {
  ChevronLeftIcon,
  ClockIcon,
  SaveIcon,
  TicketIcon,
} from "@heroicons/react/outline";
import axios from "axios";
import { createAPI } from "../../../api";
import qs from "querystring";
import { Alert } from "../../../Components/Ui/Alert";
import FormControl from "../../../Components/Forms/FormControl";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { createAdminRoute } from "../../../routes";

export const LibraryBorrowingEditModule = () => {
  const { idLibrary, idBorrowing } = useParams();
  const [borrowing, setBorrowing] = useState({});
  const [alert, setAlert] = useState(null);

  useEffect(() => {
    axios
      .get(createAPI("borrowing/:id", { id: idBorrowing }))
      .then((response) => setBorrowing(response.data.data))
      .catch((error) => console.log(error));
  }, [idBorrowing, alert]);

  function extendTime(idBorrowing) {
    axios
      .put(createAPI("borrowing/:id", { id: idBorrowing }), {
        extend: true,
        fine: borrowing.fine,
      })
      .then((response) => {
        if (response.data.status === "success") {
          // Borrowing Deleted
          window.scrollTo(0, 0);
          setAlert({
            message: "Borrowing updated",
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
      });
  }

  return (
    <>
      <ButtonLink
        to={createAdminRoute("LibraryBorrowing", { id: idLibrary })}
        variant="secondary"
        icon={<ChevronLeftIcon className="h-6 mr-1" />}
        text="Back"
      />
      <div className="Content mt-4">
        {alert && (
          <Alert
            message={alert.message}
            type={alert.type}
            onClick={() => setAlert(null)}
          />
        )}

        <div className="flex flex-col lg:flex-row items-center">
          <div className="w-full lg:w-6/12 mb-8 lg:mb-0 text-center">
            <TicketIcon className="mx-auto h-32 bg-indigo-600 text-white rounded-full p-4" />
          </div>
          <form
            method="post"
            className="w-full lg:w-6/12"
            onSubmit={(e) => {
              e.preventDefault();
              const form = new FormData(e.target);
              const data = {};
              for (let pair of form.entries()) {
                data[pair[0]] = pair[1];
              }

              axios
                .put(
                  createAPI("library/:id", { id: borrowing.id }),
                  qs.stringify({ ...data })
                )
                .then((response) => {
                  if (response.data.status === "success") {
                    // Edited
                    window.scrollTo(0, 0);
                    setAlert({
                      message: "Library Edited Successfully",
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
            }}
          >
            {alert && (
              <Alert
                message={alert.message}
                type={alert.type}
                onClick={() => setAlert(null)}
              />
            )}
            <FormControl
              type="text"
              id="fine"
              name="fine"
              label="Fine"
              value={borrowing.fine}
              placeholder="Library"
            />

            <FormControl
              type="text"
              label="Date Returned"
              value={borrowing.date_returned}
              disabled
            />

            <div className="flex justify-between">
              <Button
                type="button"
                text="Extend"
                variant="yellow"
                icon={<ClockIcon className="h-6 mr-1" />}
                onClick={() => extendTime(borrowing.id)}
              />

              <Button
                type="submit"
                text="Save"
                variant="primary"
                icon={<SaveIcon className="h-6 mr-1" />}
              />
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
