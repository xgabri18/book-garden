import { Button, ButtonLink } from "../../../Components/Ui/Button";
import { createAdminRoute } from "../../../routes";
import { ChevronLeftIcon, PlusIcon } from "@heroicons/react/outline";
import axios from "axios";
import { createAPI } from "../../../api";
import qs from "querystring";
import { Alert } from "../../../Components/Ui/Alert";
import FormControl from "../../../Components/Forms/FormControl";
import Textarea from "../../../Components/Forms/Textarea";
import { useEffect, useState } from "react";
import Select from "react-select";
import "../../../Components/Ui/Select.css";

export const UserCreateModule = () => {
  const [alert, setAlert] = useState(null);
  const [libraries, setLibraries] = useState([]);

  useEffect(() => {
    axios
      .get(createAPI("library"))
      .then((response) => setLibraries(response.data.data))
      .catch((error) => console.log(error));
  }, [alert]);

  const userTypeOptions = [
    { value: 1, label: "User" },
    { value: 3, label: "Distributor" },
    { value: 4, label: "Librarian" },
    { value: 5, label: "Admin" },
  ];

  const libraryOptions = [{ value: null, label: "No Library" }];

  libraries.map((library) =>
    libraryOptions.push({ value: library.id, label: library.name })
  );

  return (
    <>
      <ButtonLink
        to={createAdminRoute("UserList")}
        variant="secondary"
        icon={<ChevronLeftIcon className="h-6 mr-1" />}
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
              .post(createAPI("person"), qs.stringify({ ...data }))
              .then((response) => {
                if (response.data.status === "success") {
                  window.scrollTo(0, 0);
                  setAlert({
                    message: "User Created Successfully",
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
            id="username"
            name="username"
            label="Username"
            placeholder="Username"
          />
          <div className="flex flex-row">
            <div className="w-1/2 pr-2">
              <FormControl
                type="text"
                id="name"
                name="name"
                label="First Name"
                placeholder="Joe"
              />
            </div>
            <div className="w-1/2 pl-2">
              <FormControl
                type="text"
                id="surname"
                name="surname"
                label="Last Name"
                placeholder="Doe"
              />
            </div>
          </div>
          <FormControl
            type="email"
            id="email"
            name="email"
            placeholder="user@example.com"
            label="Email"
          />
          <FormControl
            type="password"
            id="password"
            name="password"
            placeholder="Password"
            label="Password"
          />
          <div className="mb-2">
            <div className="mb-1 cursor-default">User type</div>
            <Select
              className="Select"
              defaultValue={userTypeOptions[0]}
              name="user_type"
              options={userTypeOptions}
            />
          </div>
          <div className="mb-2">
            <div className="mb-1 cursor-default">Librarian</div>
            <Select
              className="Select"
              defaultValue={libraryOptions[0]}
              name="library_id"
              options={libraryOptions}
            />
          </div>
          <Textarea
            type="text"
            id="profiledesc"
            name="profiledesc"
            label="Profile Description"
            placeholder="Lorem ipsum..."
          />

          <div className="flex items-end">
            <Button
              type="submit"
              text="Create"
              variant="green"
              className="ml-auto"
              icon={<PlusIcon className="h-6 mr-1" />}
            />
          </div>
        </form>
      </div>
    </>
  );
};
