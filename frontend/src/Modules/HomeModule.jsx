import header from "../Assets/header.svg";
import Button from "../Components/Button";
import { BookOpenIcon } from "@heroicons/react/outline";
import { LibraryIcon } from "@heroicons/react/solid";

const HomeModule = () => {
  return (
    <div className="flex flex-col lg:flex-row justify-between items-center gap-8 h-full">
      <div className="mb-8 lg:mb-0">
        <div className="text-3xl text-center sm:text-5xl sm:text-left font-bold">
          Your Favorite
          <br />
          Book Finder.
        </div>

        <div className="text-2xl text-center sm:text-left py-8 md:py-16">
          When it comes to reading time, we are here to bring you your favorite
          book, from your favorite library.
        </div>

        <div className="flex flex-col gap-4 sm:flex-row md:gap-8">
          <Button
            to="/book-titles"
            text="Find a Book"
            variant="primary"
            icon={<BookOpenIcon className="h-6 w-6 inline pr-1" />}
          />
          <Button
            to="/libraries"
            text="Find a Library"
            variant="secondary"
            icon={<LibraryIcon className="h-6 w-6 inline pr-1" />}
          />
        </div>
      </div>

      <div>
        <img src={header} alt="BookGarden" />
      </div>
    </div>
  );
};

export default HomeModule;
