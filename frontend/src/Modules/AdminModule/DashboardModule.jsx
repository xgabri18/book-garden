import { Link } from "react-router-dom";
import {
  ArchiveIcon,
  BookOpenIcon,
  CollectionIcon,
  CreditCardIcon,
  LibraryIcon,
  TicketIcon,
  UserIcon,
} from "@heroicons/react/outline";
import AuthService from "../../auth";
import auth from "../../auth";

export const DashboardModule = () => {
  const modules = [
    {
      name: "Book Titles",
      url: "/admin/book-titles",
      icon: <BookOpenIcon className="h-12 mx-auto text-indigo-600" />,
      roles: ["admin", "librarian", "distributor"],
    },
    {
      name: "Libraries",
      url: "/admin/libraries",
      icon: <LibraryIcon className="h-12 mx-auto text-indigo-600" />,
      roles: ["admin", "admin"],
    },
    {
      name: "Library",
      url: "/admin/libraries/" + auth.library_id,
      icon: <LibraryIcon className="h-12 mx-auto text-indigo-600" />,
      roles: ["librarian"],
    },
    {
      name: "Reservations",
      url: "/admin/libraries/" + auth.library_id + "/reservations",
      icon: <CollectionIcon className="h-12 mx-auto text-indigo-600" />,
      roles: ["librarian"],
    },
    {
      name: "Borrowings",
      url: "/admin/libraries/" + auth.library_id + "/borrowings",
      icon: <TicketIcon className="h-12 mx-auto text-indigo-600" />,
      roles: ["librarian"],
    },
    {
      name: "Users",
      url: "/admin/users",
      icon: <UserIcon className="h-12 mx-auto text-indigo-600" />,
      roles: ["admin"],
    },
    {
      name: "Stock",
      url: "/admin/libraries/" + auth.library_id + "/stock",
      icon: <ArchiveIcon className="h-12 mx-auto text-indigo-600" />,
      roles: ["librarian"],
    },
    {
      name: "Orders",
      url: "/admin/orders",
      icon: <CreditCardIcon className="h-12 mx-auto text-indigo-600" />,
      roles: ["admin", "distributor"],
    },
  ];

  return (
    <>
      <h1 className="text-2xl text-center font-bold my-8">Welcome back</h1>
      <div className="flex items-center flex-wrap">
        {modules.map((module, index) => {
          if (!module.roles.find((r) => r === AuthService.getUserType()))
            return false;

          return (
            <div className="w-full lg:w-3/12 p-2" key={index}>
              <Link
                to={module.url}
                key={index}
                className="block border-2 bg-white border-transparent rounded-md text-center px-4 py-8 hover:shadow-md hover:border-indigo-600 transition"
              >
                {module.icon}
                <div className="text-xl font-semibold text-indigo-600 mt-4">
                  {module.name}
                </div>
              </Link>
            </div>
          );
        })}
      </div>
    </>
  );
};
