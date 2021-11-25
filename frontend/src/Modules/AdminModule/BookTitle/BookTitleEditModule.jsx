import { Button, ButtonLink } from "../../../Components/Ui/Button";
import {
  BookOpenIcon,
  ChevronLeftIcon,
  SaveIcon,
} from "@heroicons/react/outline";
import FormControl from "../../../Components/Forms/FormControl";

export const BookTitleEditModule = () => {
  return (
    <>
      <ButtonLink
        to="/admin/book-titles"
        variant="secondary"
        icon={<ChevronLeftIcon className="h-6" />}
        text="Back"
      />
      <div className="Content mt-4">
        <div className="flex items-center">
          <div className="w-6/12">
            <BookOpenIcon className="mx-auto h-32 bg-indigo-600 text-white rounded-full p-4" />
            <div className="my-4 text-2xl text-center font-bold">
              Lorem Ipsum
            </div>
            <div className="italic text-center">I love 50 shades of gray.</div>
          </div>
          <div className="w-6/12">
            <FormControl
              type="text"
              id="name"
              label="Book Name"
              placeholder="Example Book"
            />
            <FormControl
              type="text"
              id="author"
              label="Author"
              placeholder="Joe Doe"
            />
            <FormControl
              type="text"
              id="isbn"
              label="ISBN"
              placeholder="3232183828"
            />
            <FormControl type="time" id="release_date" label="Release Date" />
            <FormControl
              type="text"
              id="publisher"
              label="Publisher"
              placeholder="Example Publisher"
            />
            <FormControl
              type="text"
              id="genre"
              label="genre"
              placeholder="e.g. Action"
            />

            <Button
              type="submit"
              text="Save"
              variant="primary"
              className="ml-auto"
              icon={<SaveIcon className="h-6" />}
            />
          </div>
        </div>
      </div>
    </>
  );
};
