import { Button, ButtonLink } from "../../../Components/Ui/Button";
import {
  ArchiveIcon,
  ChevronLeftIcon,
  ExternalLinkIcon,
  PencilIcon,
  TrashIcon,
} from "@heroicons/react/outline";
import { createAdminRoute } from "../../../routes";

export const LibraryListModule = () => {
  return (
    <>
      <ButtonLink
        to="/admin"
        variant="secondary"
        icon={<ChevronLeftIcon className="h-6" />}
        text="Back"
      />
      <div className="Content mt-4">
        <h1 className="Content-Title">Libraries</h1>

        <table className="table-auto w-full overflow-x-scroll">
          <thead>
            <tr className="text-left">
              <th>#</th>
              <th>Name</th>
              <th>Place</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>Lorem ipsum</td>
              <td>London, GB</td>
              <td className="w-1/4">
                <div className="flex items-center gap-2">
                  <ButtonLink
                    to={createAdminRoute("LibraryShow", { id: 1 })}
                    variant="primary"
                    icon={<ExternalLinkIcon className="h-6 mr-1" />}
                    text="Open"
                    hideTextSm
                  />
                  <ButtonLink
                    to={createAdminRoute("LibraryEdit", { id: 1 })}
                    variant="yellow"
                    icon={<PencilIcon className="h-6 mr-1" />}
                    text="Edit"
                    hideTextSm
                  />
                  <ButtonLink
                    to={createAdminRoute("LibraryStock", { id: 1 })}
                    variant="green"
                    icon={<ArchiveIcon className="h-6 mr-1" />}
                    text="Stock"
                    hideTextSm
                  />
                  <Button
                    type="button"
                    variant="red"
                    icon={<TrashIcon className="h-6 mr-1" />}
                    text="Delete"
                    hideTextSm
                  />
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};
