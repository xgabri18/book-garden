import "./FilterDropdown.css";
import { useState } from "react";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/solid";

export const FilterDropdown = ({ children }) => {
  return <div className="FilterDropdown">{children}</div>;
};

export const FilterDropdownItem = (props) => {
  const [collapsed, setCollapsed] = useState(props.collapsed);

  return (
    <div className={`FilterDropdownItem ${collapsed ? "collapsed" : ""}`}>
      <div
        className="FilterDropdownItem-header"
        onClick={() => setCollapsed(!collapsed)}
      >
        {props.title}

        {collapsed ? (
          <ChevronDownIcon className="FilterDropdownItem-icon" />
        ) : (
          <ChevronUpIcon className="FilterDropdownItem-icon" />
        )}
      </div>
      <div className="FilterDropdownItem-body">{props.children}</div>
    </div>
  );
};
