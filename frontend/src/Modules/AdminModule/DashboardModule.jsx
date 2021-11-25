import { Link, useRouteMatch } from "react-router-dom";
import { idLibrary, role } from "../../middlewares";
import {
  ArchiveIcon,
  BookOpenIcon,
  CollectionIcon,
  CreditCardIcon,
  LibraryIcon,
  TicketIcon,
  UserIcon,
} from "@heroicons/react/outline";

export const DashboardModule = () => {
  const { path } = useRouteMatch();

  return (
    <>
      <h1 className="text-2xl text-center font-bold">Welcome back, {role}</h1>
      <div className="flex items-center flex-wrap">
        {modules.map((module, index) => {
          if (!module.roles.find((r) => r === role)) return false;

          return (
            <div className="w-3/12 p-2" key={index}>
              <Link
                to={module.url}
                key={index}
                className="block border border-gray-200 rounded-md text-center px-4 py-8 hover:shadow-md transition"
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

export const modules = [
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
    roles: ["admin"],
  },
  {
    name: "Library",
    url: "/admin/libraries/" + idLibrary,
    icon: <LibraryIcon className="h-12 mx-auto text-indigo-600" />,
    roles: ["librarian"],
  },
  {
    name: "Reservations",
    url: "/admin/libraries/" + idLibrary + "/reservations",
    icon: <CollectionIcon className="h-12 mx-auto text-indigo-600" />,
    roles: ["librarian"],
  },
  {
    name: "Borrowings",
    url: "/admin/libraries/" + idLibrary + "/borrowings",
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
    url: "/admin/libraries/" + idLibrary + "/stock",
    icon: <ArchiveIcon className="h-12 mx-auto text-indigo-600" />,
    roles: ["librarian"],
  },
  {
    name: "Orders",
    url: "/admin/orders",
    icon: <CreditCardIcon className="h-12 mx-auto text-indigo-600" />,
    roles: ["distributor"],
  },
];
