import {
  CollectionIcon,
  SaveIcon,
  ThumbUpIcon,
  TicketIcon,
  UserIcon,
} from "@heroicons/react/outline";
import FormControl from "../../Components/Forms/FormControl";
import { Button, ButtonLink } from "../../Components/Ui/Button";
import auth from "../../auth";
import axios from "axios";
import { createAPI } from "../../api";
import qs from "querystring";
import { useState } from "react";
import { Alert } from "../../Components/Ui/Alert";
import Textarea from "../../Components/Forms/Textarea";

const AccountProfileModule = () => {
  const [alert, setAlert] = useState(null);

  function updateProfile(form) {
    const formData = new FormData(form);
    const data = {};
    for (let pair of formData.entries()) {
      data[pair[0]] = pair[1];
    }

    axios
      .put(createAPI("person/:id", { id: auth.id }), qs.stringify({ ...data }))
      .then((response) => {
        if (response.data.status === "success") {
          window.scrollTo(0, 0);
          setAlert({
            message: "Profile Edited Successfully",
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
    <div className="Content">
      <div className="flex flex-col lg:flex-row items-center">
        <div className="w-full lg:w-6/12 mb-8 lg:mb-0">
          <UserIcon className="mx-auto h-32 bg-indigo-600 text-white rounded-full p-4" />
          <div className="my-4 text-2xl text-center font-bold">
            {auth.username}
          </div>
          <div className="italic text-center px-16">{auth.profiledesc}</div>

          <div className="flex flex-row items-center justify-center gap-4 mt-8">
            <ButtonLink
              to="/account/reservations"
              variant="secondary"
              icon={<CollectionIcon className="h-6" />}
              text="Reservations"
            />
            <ButtonLink
              to="/account/borrowings"
              variant="secondary"
              icon={<TicketIcon className="h-6" />}
              text="Borrowings"
            />
            <ButtonLink
              to="/account/voting"
              variant="secondary"
              icon={<ThumbUpIcon className="h-6" />}
              text="Voting"
            />
          </div>
        </div>
        <form
          method="post"
          className="w-full lg:w-6/12"
          onSubmit={(e) => {
            e.preventDefault();
            updateProfile(e.target);
          }}
        >
          {alert && (
            <Alert
              message={alert.message}
              type={alert.type}
              onClick={() => setAlert(null)}
            />
          )}

          <h1 className="Content-Title">Account Information</h1>
          <FormControl
            type="text"
            id="name"
            name="name"
            label="First Name"
            value={auth.name}
            placeholder="Joe"
          />
          <FormControl
            type="text"
            id="surname"
            name="surname"
            label="Last Name"
            value={auth.surname}
            placeholder="Doe"
          />
          <FormControl
            type="text"
            id="username"
            name="username"
            label="Username"
            value={auth.username}
            placeholder="joe.doe"
          />
          <FormControl
            type="email"
            id="email"
            name="email"
            label="E-Mail"
            value={auth.email}
            placeholder="joe.doe@example.com"
          />
          <Textarea
            id="description"
            name="description"
            label="Description"
            value={auth.profiledesc}
            placeholder="Lorem ipsum..."
          />
          <hr className="my-4" />
          <h1 className="Content-Title">Change Password</h1>
          <FormControl
            type="password"
            id="password"
            name="password"
            label="Password"
            value={auth.password}
            placeholder="New Password"
          />

          <div className="flex flex-end">
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
    </div>
  );
};

export default AccountProfileModule;
