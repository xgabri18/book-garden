import { Button, ButtonLink } from "../../../Components/Ui/Button";
import {
  ChevronLeftIcon,
  LibraryIcon,
  SaveIcon,
} from "@heroicons/react/outline";
import axios from "axios";
import { createAPI } from "../../../api";
import qs from "querystring";
import { Alert } from "../../../Components/Ui/Alert";
import FormControl from "../../../Components/Forms/FormControl";
import Textarea from "../../../Components/Forms/Textarea";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { createAdminRoute } from "../../../routes";

export const LibraryEditModule = () => {
  const { id } = useParams();
  const [library, setLibrary] = useState({});
  const [alert, setAlert] = useState(null);

  useEffect(() => {
    axios
      .get(createAPI("library/:id", { id }))
      .then((response) => setLibrary(response.data.data))
      .catch((error) => console.log(error));
  }, [id, alert]);

  return (
    <>
      <ButtonLink
        to={createAdminRoute("LibraryShow", { id: library.id })}
        variant="secondary"
        icon={<ChevronLeftIcon className="h-6 mr-0 md:mr-1" />}
        text="Back"
      />
      <div className="Content mt-4">
        <div className="flex flex-col lg:flex-row items-center">
          <div className="w-full lg:w-6/12 mb-8 lg:mb-0 text-center">
            <LibraryIcon className="mx-auto h-32 bg-indigo-600 text-white rounded-full p-4" />
            <div className="my-4 text-2xl text-center font-bold">
              {library.name}
            </div>
            <div className="italic text-center px-20">
              {library.description}
            </div>
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
                  createAPI("library/:id", { id: library.id }),
                  qs.stringify({ ...data })
                )
                .then((response) => {
                  if (response.data.status === "success") {
                    window.scrollTo(0, 0);
                    setAlert({
                      message: "Library Edited Successfully",
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
              value={library.name}
              placeholder="Library"
            />
            <FormControl
              type="text"
              id="city"
              name="city"
              label="City"
              value={library.city}
              placeholder="London"
            />
            <FormControl
              type="text"
              id="street"
              name="street"
              label="Street"
              value={library.street}
              placeholder="2987 Oxford Street, LN 13224"
            />
            <FormControl
              type="text"
              id="open_hours"
              name="open_hours"
              value={library.open_hours}
              placeholder="8:00 - 14:00"
              label="Opening hours"
            />
            <Textarea
              type="text"
              id="description"
              name="description"
              label="Description"
              value={library.description}
              placeholder="Lorem ipsum..."
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
      </div>
    </>
  );
};
