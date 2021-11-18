import FormControl from "../../Components/Forms/FormControl";
import { Button } from "../../Components/Ui/Button";
import { Link } from "react-router-dom";

const AccountRegisterModule = () => {
  return (
    <div className="w-full sm:w-6/12 xl:w-4/12 mx-auto py-16 px-8 bg-white shadow-sm">
      <div className="uppercase text-center font-bold text-lg mb-8">
        Create an account
      </div>
      <div className="flex flex-col">
        <div className="flex flex-row">
          <div className="pr-2">
            <FormControl
              type="text"
              id="first_name"
              label="First Name"
              placeholder="Joe"
            />
          </div>
          <div className="pl-2">
            <FormControl
              type="text"
              id="last_name"
              label="Last Name"
              placeholder="Doe"
            />
          </div>
        </div>
        <FormControl
          type="email"
          id="email"
          label="Email"
          placeholder="joe.doe@example.com"
        />
        <FormControl
          type="password"
          id="password"
          label="Password"
          placeholder="Password"
        />
        <FormControl
          type="password"
          id="confirm_password"
          label="Confirm Password"
          placeholder="Confirm Password"
        />
      </div>
      <Button
        to="submit"
        variant="primary"
        text="Login"
        className="block w-full"
      />

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
