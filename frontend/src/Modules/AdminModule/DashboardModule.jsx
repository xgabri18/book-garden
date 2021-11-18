import {
  BookOpenIcon,
  CollectionIcon,
  LibraryIcon,
  UserIcon,
} from "@heroicons/react/outline";
import { Link } from "react-router-dom";

export const DashboardModule = () => {
  const modules = {
    admin: [
      {
        name: "Books Titles",
        url: "/admin/bookTitles",
        icon: <BookOpenIcon className="h-12 mx-auto text-indigo-600" />,
        roles: ["admin"],
      },
      {
        name: "Libraries",
        url: "/admin/libraries",
        icon: <LibraryIcon className="h-12 mx-auto text-indigo-600" />,
        roles: ["admin"],
      },
      {
        name: "Reservations",
        url: "/admin/reservations",
        icon: <CollectionIcon className="h-12 mx-auto text-indigo-600" />,
        roles: ["admin"],
      },
      {
        name: "Users",
        url: "/admin/users",
        icon: <UserIcon className="h-12 mx-auto text-indigo-600" />,
        roles: ["admin"],
      },
    ],
  };

  return (
    <>
      <h1 className="text-2xl text-center font-bold">Welcome back, user</h1>
      <div className="flex justify-between items-center">
        {modules.admin.map((module, index) => (
          <Link to={module.url} key={index} className="w-3/12 p-4">
            <div className="border border-gray-200 rounded-md text-center px-4 py-8">
              {module.icon}
              <div className="text-lg font-bold text-indigo-600 mt-2">
                {module.name}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
};
