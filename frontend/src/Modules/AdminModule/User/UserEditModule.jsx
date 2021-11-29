import { useEffect, useState } from "react";
import axios from "axios";
import { createAPI } from "../../../api";
import { Button, ButtonLink } from "../../../Components/Ui/Button";
import { createAdminRoute } from "../../../routes";
import { ChevronLeftIcon, SaveIcon } from "@heroicons/react/outline";
import qs from "querystring";
import { Alert } from "../../../Components/Ui/Alert";
import FormControl from "../../../Components/Forms/FormControl";
import Select from "react-select";
import Textarea from "../../../Components/Forms/Textarea";
import { useParams } from "react-router-dom";

export const UserEditModule = () => {
  const [alert, setAlert] = useState(null);
  const [libraries, setLibraries] = useState([]);
  const [user, setUser] = useState({});
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(createAPI("library"))
      .then((response) => setLibraries(response.data.data))
      .catch((error) => console.log(error));

    axios
      .get(createAPI("person/:id", { id: id }))
      .then((response) => setUser(response.data.data))
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
              .put(createAPI("person/:id", { id }), qs.stringify({ ...data }))
              .then((response) => {
                if (response.data.status === "success") {
                  window.scrollTo(0, 0);
                  setAlert({
                    message: "User Updated Successfully",
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
            value={user.username}
          />
          <div className="flex flex-row">
            <div className="w-1/2 pr-2">
              <FormControl
                type="text"
                id="name"
                name="name"
                label="First Name"
                placeholder="Joe"
                value={user.name}
              />
            </div>
            <div className="w-1/2 pl-2">
              <FormControl
                type="text"
                id="surname"
                name="surname"
                label="Last Name"
                placeholder="Doe"
                value={user.surname}
              />
            </div>
          </div>
          <FormControl
            type="email"
            id="email"
            name="email"
            placeholder="user@example.com"
            label="Email"
            value={user.email}
          />
          <FormControl
            type="password"
            id="password"
            name="password"
            placeholder="Password"
            label="Password"
            value={user.password}
          />
          <div className="mb-2">
            <div className="mb-1 cursor-default">User type</div>
            <Select
              className="Select"
              defaultValue={userTypeOptions.find((o) => o.value === user.id)}
              name="user_type"
              options={userTypeOptions}
            />
          </div>
          <div className="mb-2">
            <div className="mb-1 cursor-default">Librarian</div>
            <Select
              className="Select"
              defaultValue={libraryOptions.find(
                (o) => o.id === user.library_id
              )}
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
            value={user.profiledesc}
          />

          <div className="flex items-end">
            <Button
              type="submit"
              text="Save"
              variant="primary"
              className="ml-auto"
              icon={<SaveIcon className="h-6 mr-1" />}
            />
          </div>
        </form>
      </div>
    </>
  );
};
