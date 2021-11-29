import { Button, ButtonLink } from "../../../Components/Ui/Button";
import { createAdminRoute } from "../../../routes";
import { ChevronLeftIcon, PlusIcon } from "@heroicons/react/outline";
import axios from "axios";
import { createAPI } from "../../../api";
import qs from "querystring";
import { Alert } from "../../../Components/Ui/Alert";
import FormControl from "../../../Components/Forms/FormControl";
import Textarea from "../../../Components/Forms/Textarea";
import { useState } from "react";

export const LibraryCreateModule = () => {
  const [alert, setAlert] = useState(null);

  return (
    <>
      <ButtonLink
        to={createAdminRoute("LibraryList")}
        variant="secondary"
        icon={<ChevronLeftIcon className="h-6 mr-0 md:mr-1" />}
        text="Back"
      />
      <div className="Content mt-4">
        <form
          method="post"
          onSubmit={(e) => {
            e.preventDefault();
            const form = new FormData(e.target);

            const data = {};

            for (let pair of form.entries()) {
              data[pair[0]] = pair[1];
            }

            axios
              .post(createAPI("library"), qs.stringify({ ...data }))
              .then((response) => {
                if (response.data.status === "success") {
                  window.scrollTo(0, 0);
                  setAlert({
                    message: "Library Created Successfully",
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
            id="name"
            name="name"
            label="Library Name"
            placeholder="Library"
          />
          <FormControl
            type="text"
            id="city"
            name="city"
            label="City"
            placeholder="London"
          />
          <FormControl
            type="text"
            id="street"
            name="street"
            label="Street"
            placeholder="987 Oxford Street, LN 13224"
          />
          <FormControl
            type="text"
            id="open_hours"
            name="open_hours"
            placeholder="8:00 - 14:00"
            label="Opening hours"
          />
          <Textarea
            type="text"
            id="description"
            name="description"
            label="Description"
            placeholder="Lorem ipsum..."
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
