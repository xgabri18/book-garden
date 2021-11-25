import FormControl from "../../Components/Forms/FormControl";
import { Button } from "../../Components/Ui/Button";
import { Link } from "react-router-dom";

const AccountLoginModule = () => {
  return (
    <div className="w-full sm:w-6/12 xl:w-4/12 mx-auto py-16 px-8 bg-white shadow-sm">
      <div className="uppercase text-center font-bold text-lg mb-8">Login</div>
      <div className="flex flex-col">
        <FormControl
          type="email"
          id="email"
          label="Email"
          placeholder="user@example.com"
        />
        <FormControl
          type="password"
          id="password"
          label="Password"
          placeholder="Password"
        />
      </div>

      <Button
        to="button"
        variant="primary"
        text="Login"
        className="block w-full"
      />

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
