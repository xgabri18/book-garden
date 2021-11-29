import { useEffect, useState } from "react";
import { Button, ButtonLink } from "../../../Components/Ui/Button";
import { createAdminRoute } from "../../../routes";
import { ChevronLeftIcon, PlusIcon } from "@heroicons/react/outline";
import axios from "axios";
import { createAPI } from "../../../api";
import qs from "querystring";
import { Alert } from "../../../Components/Ui/Alert";
import FormControl from "../../../Components/Forms/FormControl";
import { useParams } from "react-router-dom";
import Select from "react-select";

export const LibraryOrderCreateModule = () => {
  const [alert, setAlert] = useState(null);
  const [bookTitles, setBookTitles] = useState([]);

  const { id } = useParams();

  useEffect(() => {
    setBookTitles([]);

    axios
      .get(createAPI("booktitle"))
      .then((response) =>
        response.data.data.map((bookTitle) =>
          setBookTitles((state) => [
            ...state,
            { value: bookTitle.id, label: bookTitle.name },
          ])
        )
      )
      .catch((error) => console.log(error));
  }, [id, alert]);

  function createOrder(form) {
    const formData = new FormData(form);

    const data = {};

    for (let pair of formData.entries()) {
      data[pair[0]] = pair[1];
    }

    axios
      .post(createAPI("order"), qs.stringify({ ...data }))
      .then((response) => {
        if (response.data.status === "success") {
          window.scrollTo(0, 0);
          setAlert({
            message: "Order Created Successfully",
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
        to={createAdminRoute("LibraryOrderList", { id })}
        variant="secondary"
        icon={<ChevronLeftIcon className="h-6 mr-0 md:mr-1" />}
        text="Back"
      />
      <div className="Content mt-4">
        <form
          method="post"
          onSubmit={(e) => {
            e.preventDefault();
            createOrder(e.target);
          }}
        >
          {alert && (
            <Alert
              message={alert.message}
              type={alert.type}
              onClick={() => setAlert(null)}
            />
          )}

          <input type="hidden" name="library_id" value={id} />

          <div className="mb-2">
            <div className="mb-1">Book Title</div>
            <Select
              className="Select"
              defaultValue={{ value: null, label: "Choose Book Title" }}
              name="booktitle_id"
              options={bookTitles}
            />
          </div>

          <FormControl
            type="number"
            id="amount"
            name="amount"
            label="Amount"
            placeholder="10"
          />
          <FormControl
            type="text"
            id="note"
            name="note"
            label="Note"
            placeholder="ASAP"
          />

          <div className="flex items-end">
            <Button
              type="submit"
              text="Create"
              variant="green"
              className="ml-auto"
              icon={<PlusIcon className="h-6 mr-0 md:mr-1" />}
            />
          </div>
        </form>
      </div>
    </>
  );
};
