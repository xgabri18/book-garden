import FormControl from "../../Components/Forms/FormControl";
import { Button } from "../../Components/Ui/Button";
import { Link, useHistory } from "react-router-dom";
import auth from "../../auth";
import { useState } from "react";
import { Alert } from "../../Components/Ui/Alert";

const AccountLoginModule = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [alert, setAlert] = useState(null);
  const history = useHistory();

  return (
    <div className="w-full sm:w-6/12 xl:w-4/12 mx-auto py-16 px-8 bg-white shadow-sm">
      <div className="uppercase text-center font-bold text-lg mb-8">Login</div>
      <form
        method="post"
        onSubmit={(e) => {
          e.preventDefault();
          auth.login(username, password).then((response) => {
            if (response.status === "success") {
              window.location.href = "/account/profile";
            } else {
              window.scrollTo(0, 0);
              setAlert({ message: response.message, type: "danger" });
            }
          });
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
          <FormControl
            type="username"
            id="username"
            label="Username"
            placeholder="joe.doe"
            onChange={(e) => setUsername(e.target.value)}
          />
          <FormControl
            type="password"
            id="password"
            label="Password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <Button
          type="submit"
          variant="primary"
          text="Login"
          className="block w-full"
        />
      </form>

      <div className="text-center mt-4">
        Don't have an account?
        <Link to="/account/register" className="Link ml-1">
          Create one
        </Link>
        .
      </div>
    </div>
  );
};

export default AccountLoginModule;
