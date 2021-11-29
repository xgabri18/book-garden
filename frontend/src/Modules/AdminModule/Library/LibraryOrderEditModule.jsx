import { useEffect, useState } from "react";
import { Button, ButtonLink } from "../../../Components/Ui/Button";
import { createAdminRoute } from "../../../routes";
import { ChevronLeftIcon, SaveIcon } from "@heroicons/react/outline";
import axios from "axios";
import { createAPI } from "../../../api";
import qs from "querystring";
import { Alert } from "../../../Components/Ui/Alert";
import FormControl from "../../../Components/Forms/FormControl";
import { useParams } from "react-router-dom";

export const LibraryOrderEditModule = () => {
  const [alert, setAlert] = useState(null);
  const [order, setOrder] = useState({});

  const { idLibrary, idOrder } = useParams();

  useEffect(() => {
    axios
      .get(createAPI("order/:id", { id: idOrder }))
      .then((response) => {
        axios
          .get(
            createAPI("booktitle/:id", { id: response.data.data.booktitle_id })
          )
          .then((bookTitle) => {
            response.data.data.bookTitle = bookTitle.data.data.name;
            setOrder(response.data.data);
          });
      })
      .catch((error) => console.log(error));
  }, [alert]);

  function editOrder(form) {
    const formData = new FormData(form);

    const data = {};

    for (let pair of formData.entries()) {
      data[pair[0]] = pair[1];
    }

    axios
      .put(createAPI("order/:id", { id: idOrder }), qs.stringify({ ...data }))
      .then((response) => {
        if (response.data.status === "success") {
          window.scrollTo(0, 0);
          setAlert({
            message: "Order Edited Successfully",
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
      <ButtonLink
        to={createAdminRoute("LibraryOrderList", { id: idLibrary })}
        variant="secondary"
        icon={<ChevronLeftIcon className="h-6 mr-0 md:mr-1" />}
        text="Back"
      />
      <div className="Content mt-4">
        <form
          method="post"
          onSubmit={(e) => {
            e.preventDefault();
            editOrder(e.target);
          }}
        >
          {alert && (
            <Alert
              message={alert.message}
              type={alert.type}
              onClick={() => setAlert(null)}
            />
          )}

          <input type="hidden" name="booktitle_id" value={order.booktitle_id} />
          <input type="hidden" name="library_id" value={idLibrary} />

          <FormControl
            type="text"
            id="booktitle"
            label="Book Title"
            value={order.bookTitle}
            disabled
          />
          <FormControl
            type="number"
            id="amount"
            name="amount"
            label="Amount"
            placeholder="10"
            value={order.amount}
          />
          <FormControl
            type="text"
            id="note"
            name="note"
            label="Note"
            placeholder="ASAP"
            value={order.note}
          />

          <div className="flex items-end">
            <Button
              type="submit"
              text="Save"
              variant="primary"
              className="ml-auto"
              icon={<SaveIcon className="h-6 mr-0 md:mr-1" />}
            />
          </div>
        </form>
      </div>
    </>
  );
};
