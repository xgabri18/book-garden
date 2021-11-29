import FormControl from "../../Components/Forms/FormControl";
import { Button } from "../../Components/Ui/Button";
import { Link, useHistory } from "react-router-dom";
import auth from "../../auth";
import { useState } from "react";
import { Alert } from "../../Components/Ui/Alert";

const AccountRegisterModule = () => {
  const history = useHistory();
  const [alert, setAlert] = useState(null);

  function registerUser(form) {
    const formData = new FormData(form);
    const data = {};

    for (let pair of formData.entries()) {
      data[pair[0]] = pair[1];
    }

    auth
      .register(data)
      .then((response) => {
        if (response.status === "success") {
          window.location.href = "/account/login";
        } else {
          window.scrollTo(0, 0);
          setAlert({ message: response.message, type: "danger" });
        }
      })
      .catch((error) => console.log(error));
  }

  return (
    <div className="w-full sm:w-6/12 xl:w-4/12 mx-auto py-16 px-8 bg-white shadow-sm">
      <div className="uppercase text-center font-bold text-lg mb-8">
        Create an account
      </div>

      <form
        method="post"
        onSubmit={(e) => {
          e.preventDefault();
          registerUser(e.target);
        }}
      >
        {alert && (
          <Alert
            message={alert.message}
            type={alert.type}
            onClick={() => setAlert(null)}
          />
        )}

        <div className="flex flex-col">
          <div className="flex flex-row">
            <div className="pr-2">
              <FormControl
                type="text"
                id="name"
                name="name"
                label="First Name"
                placeholder="Joe"
              />
            </div>
            <div className="pl-2">
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
            type="text"
            id="username"
            name="username"
            label="Username"
            placeholder="joe.doe"
          />
          <FormControl
            type="email"
            id="email"
            name="email"
            label="Email"
            placeholder="joe.doe@example.com"
          />
          <FormControl
            type="password"
            id="password"
            name="password"
            label="Password"
            placeholder="Password"
          />
        </div>
        <Button
          to="submit"
          variant="primary"
          text="Register"
          className="block w-full"
        />
      </form>

      <div className="text-center mt-4">
        Already have an account?
        <Link to="/account/login" className="Link ml-1">
          Log in
        </Link>
        .
      </div>
    </div>
  );
};

export default AccountRegisterModule;
