import { SearchIcon, XIcon } from "@heroicons/react/outline";
import { useRef, useState } from "react";
import "./NavbarSearch.css";
import { useOnClickOutside } from "../../Hooks/useOnClickOutside";

const NavbarSearch = () => {
  const [searchExpanded, setSearchExpanded] = useState(false);

  const searchRef = useRef();
  useOnClickOutside(searchRef, () => setSearchExpanded(false));

  function handleInputChange() {}

  return (
    <>
      <div
        className={`Navbar-search ${searchExpanded ? "expanded" : ""}`}
        ref={searchRef}
      >
        <label htmlFor="search" className="sr-only">
          Search:
        </label>
        <input
          type="text"
          id="search"
          placeholder="Search for books, authors..."
          className="bg-white md:bg-gray-100 py-1.5 px-4 rounded-md outline-none"
          style={{ minWidth: "300px" }}
          onChange={handleInputChange}
        />

        <button
          className="Navbar-search-close"
          onClick={() => setSearchExpanded(false)}
        >
          <XIcon className="h-6" />
        </button>
      </div>

      <button
        className="Navbar-link flex md:hidden"
        onClick={() => setSearchExpanded(!searchExpanded)}
      >
        <SearchIcon className="h-6" />
      </button>
    </>
  );
};

export default NavbarSearch;
