import { Link } from "react-router-dom";
import { ArrowLeftIcon } from "@heroicons/react/outline";
import "./Breadcrumb.css";
import { ButtonLink } from "./Button";

export const Breadcrumb = (props) => {
  return (
    <div className="Breadcrumb">
      <ButtonLink
        to={props.backLink}
        variant="primary"
        size="sm"
        className="Breadcrumb-back"
        text="Back"
        icon={<ArrowLeftIcon className="h-4 inline-block mr-1" />}
      />

      <nav className="Breadcrumb-items">
        <ol>
          <li className="Breadcrumb-item">
            <Link to="/">Home</Link>
          </li>
          {props.items.map((item, index) => (
            <li
              key={index}
              className={`Breadcrumb-item ${item.active ? "active" : ""}`}
            >
              {item.active ? item.name : <Link to={item.url}>{item.name}</Link>}
            </li>
          ))}
        </ol>
      </nav>
    </div>
  );
};
