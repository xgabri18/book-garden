import { useEffect, useState } from "react";
import axios from "axios";
import { createAPI } from "../../api";
import { ChevronLeftIcon, LibraryIcon } from "@heroicons/react/outline";
import { ButtonLink } from "../../Components/Ui/Button";

const LibraryList = () => {
  const [libraries, setLibraries] = useState([]);

  useEffect(() => {
    axios
      .get(createAPI("library"))
      .then((response) => setLibraries(response.data.data))
      .catch((error) => console.log(error));
  }, []);

  return (
    <>
      <ButtonLink
        to="/"
        variant="secondary"
        icon={<ChevronLeftIcon className="h-6 mr-0 md:mr-1" />}
        text="Back"
      />

      <div className="flex flex-col gap-4 mt-4">
        {libraries.map((library, index) => (
          <div
            key={index}
            className="flex flex-col md:flex-row items-center justify-center md:justify-start bg-white shadow-md p-8 gap-8 transition transform hover:scale-105 hover:bg-gray-50"
          >
            <div className="w-full md:w-2/12">
              <LibraryIcon className="h-32 bg-indigo-500 text-white rounded-full p-4 mx-auto md:mx-0" />
            </div>
            <div>
              <div className="w-full md:w-10/12 text-2xl font-bold">
                {library.name}
              </div>
              <div>{library.city}</div>
              <div className="text-gray-500">{library.street}</div>
              <div className="text-lg">{library.open_hours}</div>
              <div className="text-sm text-gray-500 italic">
                {library.description}
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default LibraryList;
