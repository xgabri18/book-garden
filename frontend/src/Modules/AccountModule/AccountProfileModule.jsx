import { SaveIcon, UserIcon } from "@heroicons/react/outline";
import FormControl from "../../Components/Forms/FormControl";
import { Button } from "../../Components/Ui/Button";

const AccountProfileModule = () => {
  return (
    <div className="Content">
      <div className="flex items-center">
        <div className="w-6/12">
          <UserIcon className="mx-auto h-32 bg-indigo-600 text-white rounded-full p-4" />
          <div className="my-4 text-2xl text-center font-bold">
            Janko Hraško
          </div>
          <div className="italic text-center">I love 50 shades of gray.</div>
        </div>
        <div className="w-6/12">
          <h1 className="Content-Title">Account Information</h1>
          <FormControl
            type="text"
            id="first_name"
            label="First Name"
            placeholder="Joe"
          />
          <FormControl
            type="text"
            id="last_name"
            label="Last Name"
            placeholder="Doe"
          />
          <FormControl
            type="email"
            id="email"
            label="E-Mail"
            placeholder="user@example.com"
          />
          <hr />
          <h1 className="Content-Title">Change Password</h1>
          <FormControl
            type="password"
            id="old_password"
            label="Old Password"
            placeholder="*******"
          />
          <FormControl
            type="password"
            id="new_password"
            label="New Password"
            placeholder="*******"
          />

          <FormControl
            type="password"
            id="new_password_confirm"
            label="New Confirm Password"
            placeholder="*******"
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
        </div>
      </div>
    </div>
  );
};

export default AccountProfileModule;
