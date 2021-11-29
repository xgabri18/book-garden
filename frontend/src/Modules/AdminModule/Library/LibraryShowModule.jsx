import { ButtonLink } from "../../../Components/Ui/Button";
import {
  ArchiveIcon,
  ChevronLeftIcon,
  CollectionIcon,
  CreditCardIcon,
  LibraryIcon,
  PencilIcon,
  TicketIcon,
} from "@heroicons/react/outline";
import axios from "axios";
import { createAPI } from "../../../api";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import AuthService from "../../../auth";
import { createAdminRoute } from "../../../routes";

export const LibraryShowModule = () => {
  const { id } = useParams();
  const [library, setLibrary] = useState({});

  useEffect(() => {
    axios
      .get(createAPI("library/:id", { id }))
      .then((response) => setLibrary(response.data.data))
      .catch((error) => console.log(error));
  }, [id]);

  return (
    <>
      <div className="flex flex-row justify-between">
        <ButtonLink
          to={
            AuthService.isAdmin()
              ? createAdminRoute("LibraryList")
              : createAdminRoute("Dashboard")
          }
          variant="secondary"
          icon={<ChevronLeftIcon className="h-6 mr-0 md:mr-1" />}
          text="Back"
        />
        <ButtonLink
          to={createAdminRoute("LibraryEdit", { id: library.id })}
          text="Edit"
          icon={<PencilIcon className="h-6 mr-0 md:mr-1" />}
          variant="yellow"
        />
      </div>
      <div className="Content mt-4">
        <div className="text-center">
          <LibraryIcon className="mx-auto h-32 bg-indigo-600 text-white rounded-full p-4" />
          <div className="my-4 text-2xl font-bold">{library.name}</div>
          <div className="text-gray-500 my-4">
            <div className="font-bold">{library.city}</div>
            {library.street}
          </div>
          <div className="text-lg my-4">
            <b>Opening Hours:</b> {library.open_hours}
          </div>
          <div className="italic text-center px-20">{library.description}</div>

          <div className="flex flex-col md:flex-row mt-8 gap-4">
            <ButtonLink
              to={createAdminRoute("LibraryReservation", { id: library.id })}
              text="Reservations"
              icon={<CollectionIcon className="h-12 mr-2 text-indigo-600" />}
              variant="secondary"
              className="w-full md:w-1/3"
            />
            <ButtonLink
              to={createAdminRoute("LibraryBorrowing", { id: library.id })}
              text="Borrowings"
              icon={<TicketIcon className="h-12 mr-2 text-indigo-600" />}
              variant="secondary"
              className="w-full md:w-1/3"
            />
            <ButtonLink
              to={createAdminRoute("LibraryStock", { id: library.id })}
              text="Stock"
              icon={<ArchiveIcon className="h-12 mr-2 text-indigo-600" />}
              variant="secondary"
              className="w-full md:w-1/3"
            />
            <ButtonLink
              to={createAdminRoute("LibraryOrderList", { id: library.id })}
              text="Orders"
              icon={<CreditCardIcon className="h-12 mr-2 text-indigo-600" />}
              variant="secondary"
              className="w-full md:w-1/3"
            />
          </div>
        </div>
      </div>
    </>
  );
};
