import "./FilterDropdown.css";
import { useState } from "react";

export const FilterDropdown = ({ children }) => {
  return <div className="FilterDropdown">{children}</div>;
};

export const FilterDropdownItem = (props) => {
  const [collapsed, setCollapsed] = useState(props.collapsed);

  return (
    <div className={`FilterDropdownItem collapsed`}>
      <div
        className="FilterDropdownItem-header"
        onClick={() => setCollapsed(!collapsed)}
      >
        {props.title}
      </div>
      <div className="FilterDropdownItem-body">{props.children}</div>
    </div>
  );
};
