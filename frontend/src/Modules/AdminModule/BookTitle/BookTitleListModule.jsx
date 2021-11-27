import { Button, ButtonLink } from "../../../Components/Ui/Button";
import {
  ChevronLeftIcon,
  ExternalLinkIcon,
  PencilIcon,
  TrashIcon,
} from "@heroicons/react/outline";
import { createAdminRoute } from "../../../routes";

export const BookTitleListModule = () => {
  return (
    <>
      <ButtonLink
        to="/admin"
        variant="secondary"
        icon={<ChevronLeftIcon className="h-6" />}
        text="Back"
      />
      <div className="Content mt-4">
        <h1 className="Content-Title">Book titles</h1>

        <table className="table-auto w-full">
          <thead>
            <tr className="text-left">
              <th>#</th>
              <th />
              <th>Name</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td className="w-2/12">
                <img
                  src="https://mrtns.eu/tovar/_m/778/m778903.jpg?v=1637249776"
                  alt="Meky Žbirka"
                  className="h-16"
                />
              </td>
              <td>Lorem ipsum</td>
              <td className="w-1/4">
                <div className="flex items-center gap-2">
                  {/*TODO: Set book title dynamically to button links*/}
                  <ButtonLink
                    to={`/book-titles/1`}
                    variant="primary"
                    icon={<ExternalLinkIcon className="h-6 mr-1" />}
                    text="Open"
                    hideTextSm
                  />
                  <ButtonLink
                    to={createAdminRoute("BookTitleEdit", { id: 1 })}
                    variant="yellow"
                    icon={<PencilIcon className="h-6 mr-1" />}
                    text="Edit"
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
