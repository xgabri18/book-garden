import {
  ArchiveIcon,
  BookOpenIcon,
  CollectionIcon,
  CreditCardIcon,
  LibraryIcon,
  TicketIcon,
  UserIcon,
} from "@heroicons/react/outline";
import { Link } from "react-router-dom";

export const DashboardModule = () => {
  // admin, librarian, distributor
  const userRole = "librarian"; // todo: Remove -> get from database

  const modules = [
    {
      name: "Book Titles",
      url: "/admin/bookTitles",
      icon: <BookOpenIcon className="h-12 mx-auto text-indigo-600" />,
      roles: ["admin", "librarian", "distributor"],
    },
    {
      name: "Libraries",
      url: "/admin/libraries",
      icon: <LibraryIcon className="h-12 mx-auto text-indigo-600" />,
      roles: ["admin"],
    },
    {
      name: "Library",
      url: "/admin/libraries",
      icon: <LibraryIcon className="h-12 mx-auto text-indigo-600" />,
      roles: ["librarian"],
    },
    {
      name: "Reservations",
      url: "/admin/reservations",
      icon: <CollectionIcon className="h-12 mx-auto text-indigo-600" />,
      roles: ["admin", "librarian"],
    },
    {
      name: "Borrowings",
      url: "/admin/borrowings",
      icon: <TicketIcon className="h-12 mx-auto text-indigo-600" />,
      roles: ["admin", "librarian"],
    },
    {
      name: "Users",
      url: "/admin/users",
      icon: <UserIcon className="h-12 mx-auto text-indigo-600" />,
      roles: ["admin"],
    },
    {
      name: "Stock",
      url: "/admin/users",
      icon: <ArchiveIcon className="h-12 mx-auto text-indigo-600" />,
      roles: ["librarian"],
    },
    {
      name: "Orders",
      url: "/admin/users",
      icon: <CreditCardIcon className="h-12 mx-auto text-indigo-600" />,
      roles: ["distributor"],
    },
  ];

  return (
    <>
      <h1 className="text-2xl text-center font-bold">
        Welcome back, {userRole}
      </h1>
      <div className="flex items-center flex-wrap">
        {modules.map((module, index) => {
          if (!module.roles.find((role) => role === userRole)) return false;

          return (
            <Link to={module.url} key={index} className="w-3/12 p-4">
              <div className="border border-gray-200 rounded-md text-center px-4 py-8">
                {module.icon}
                <div className="text-xl font-semibold text-indigo-600 mt-4">
                  {module.name}
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </>
  );
};
