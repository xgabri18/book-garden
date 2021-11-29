import header from "../Assets/header.svg";
import { ButtonLink } from "../Components/Ui/Button";
import { BookOpenIcon, LibraryIcon } from "@heroicons/react/outline";

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
          <ButtonLink
            to="/book-titles"
            text="Find a Book"
            variant="primary"
            size="lg"
            icon={<BookOpenIcon className="h-6 w-6 inline pr-1" />}
          />
          <ButtonLink
            to="/libraries"
            text="Find a Library"
            variant="secondary"
            size="lg"
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
