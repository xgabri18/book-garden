import { Button, ButtonLink } from "../../../Components/Ui/Button";
import {
  ChevronLeftIcon,
  CogIcon,
  PencilIcon,
  PlusIcon,
  TrashIcon,
} from "@heroicons/react/outline";
import { createAdminRoute } from "../../../routes";
import { useEffect, useState } from "react";
import axios from "axios";
import { createAPI } from "../../../api";
import { Alert } from "../../../Components/Ui/Alert";
import {
  Table,
  TableCol,
  TableColHead,
  TableRow,
  Tbody,
  Thead,
} from "../../../Components/Ui/Table";
import { PingLoading } from "../../../Components/Ui/PingLoading";

export const LibraryListModule = () => {
  const [alert, setAlert] = useState(null);
  const [libraries, setLibraries] = useState([]);

  useEffect(() => {
    axios
      .get(createAPI("library"))
      .then((response) => setLibraries(response.data.data))
      .catch((error) => console.log(error));
  }, [alert]);

  function deleteLibrary(id) {
    axios
      .delete(createAPI("library/:id", { id }))
      .then((response) => {
        if (response.data.status === "success") {
          window.scrollTo(0, 0);
          setAlert({
            message: "Library Deleted",
            type: "success",
          });
        } else {
          window.scrollTo(0, 0);
          setAlert({
            message: response.data.message,
            type: "danger",
          });
        }
      })
      .catch((error) => console.log(error));
  }

  return (
    <>
      <div className="flex justify-between">
        <ButtonLink
          to={createAdminRoute("Dashboard")}
          variant="secondary"
          icon={<ChevronLeftIcon className="h-6 mr-0 md:mr-1" />}
          text="Back"
        />
        <ButtonLink
          to={createAdminRoute("LibraryCreate")}
          variant="green"
          icon={<PlusIcon className="h-6 mr-0 md:mr-1" />}
          text="New Library"
        />
      </div>
      <div className="Content mt-4">
        {alert && (
          <Alert
            message={alert.message}
            type={alert.type}
            onClick={() => setAlert(null)}
          />
        )}
        <h1 className="Content-Title">
          Libraries {!libraries.length ? <PingLoading /> : ""}
        </h1>

        <div className="overflow-auto">
          <Table>
            <Thead>
              <TableRow>
                <TableColHead>Name</TableColHead>
                <TableColHead>Address</TableColHead>
                <TableColHead>Actions</TableColHead>
              </TableRow>
            </Thead>
            <Tbody>
              {libraries.map((library, index) => (
                <TableRow key={index} index={index} striped>
                  <TableCol>{library.name}</TableCol>
                  <TableCol>
                    <div className="font-bold">{library.city}</div>
                    <div className="hidden lg:block">{library.street}</div>
                  </TableCol>
                  <TableCol>
                    <div className="flex items-center gap-2">
                      <ButtonLink
                        to={createAdminRoute("LibraryShow", { id: library.id })}
                        variant="primary"
                        icon={<CogIcon className="h-6 mr-0 md:mr-1" />}
                        text="Manage"
                        showText="md"
                      />
                      <ButtonLink
                        to={createAdminRoute("LibraryEdit", { id: library.id })}
                        variant="yellow"
                        icon={<PencilIcon className="h-6 mr-0 md:mr-1" />}
                        text="Edit"
                        showText="md"
                      />
                      <Button
                        type="button"
                        variant="red"
                        icon={<TrashIcon className="h-6 mr-0 md:mr-1" />}
                        text="Delete"
                        showText="md"
                        onClick={() => deleteLibrary(library.id)}
                      />
                    </div>
                  </TableCol>
                </TableRow>
              ))}
            </Tbody>
          </Table>
        </div>
      </div>
    </>
  );
};
