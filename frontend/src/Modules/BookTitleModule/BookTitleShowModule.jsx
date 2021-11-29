import { BookTitle } from "../../Components/BookTitle/BookTitle";
import { Breadcrumb } from "../../Components/Ui/Breadcrumb";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { createAPI } from "../../api";
import { Link, useParams } from "react-router-dom";
import { Button } from "../../Components/Ui/Button";
import {
  ThumbDownIcon,
  ThumbUpIcon,
  TicketIcon,
} from "@heroicons/react/outline";
import auth from "../../auth";
import { createRoute } from "../../routes";
import qs from "querystring";
import { Alert } from "../../Components/Ui/Alert";

const BookTitleShowModule = () => {
  const [bookTitle, setBookTitle] = useState({});
  const [libraries, setLibraries] = useState([]);
  const [userVotes, setUserVotes] = useState([]);
  const [alert, setAlert] = useState(null);

  // Scroll to alert
  const alertRef = useRef(null);
  const executeScroll = () => alertRef.current.scrollIntoView();

  const { id } = useParams();

  useEffect(() => {
    setLibraries([]);

    axios
      .get(createAPI("booktitle/:id", { id }))
      .then((response) => {
        setBookTitle(response.data.data);

        let book = response.data.data;

        axios
          .get(createAPI("library"))
          .then((response) => {
            response.data.data.map((library) =>
              axios
                .get(createAPI("stock/filter"), {
                  params: {
                    library_id: library.id,
                    booktitle_id: book.id,
                  },
                })
                .then((response) => {
                  library.stock = response.data.data[0];
                  setLibraries((state) => [...state, library]);
                })
                .catch((error) => console.log(error))
            );
          })
          .catch((error) => console.log(error));
      })
      .catch((error) => console.log(error));

    axios
      .get(createAPI("voting/votesofperson/:id", { id: auth.id }))
      .then((response) => setUserVotes(response.data.data))
      .catch((error) => console.log(error));
  }, [id, alert]);

  function reserveBook(stock_id) {
    axios
      .post(createAPI("reservation"), qs.stringify({ stock_id }))
      .then((response) => {
        if (response.data.status === "success") {
          setAlert({
            message: "Book reserved",
            type: "success",
          });
        } else {
          window.scrollTo(0, 0);
          setAlert({
            message: response.data.message,
            type: "danger",
          });
        }

        executeScroll();
      });
  }

  function voteBook(stock_id) {
    axios
      .post(createAPI("voting"), qs.stringify({ stock_id }))
      .then((response) => {
        if (response.data.status === "success") {
          setAlert({
            message: "Book voted",
            type: "success",
          });
        } else {
          setAlert({
            message: response.data.message,
            type: "danger",
          });
        }

        executeScroll();
      })
      .catch((error) => console.log(error));
  }

  function removeVoteBook(stock_id) {
    userVotes.find((vote) =>
      vote.stock_id === stock_id
        ? axios
            .delete(createAPI("voting/:id", { id: vote.id }))
            .then((response) => {
              if (response.data.status === "success") {
                setAlert({
                  message: "Vote has been removed",
                  type: "success",
                });
              } else {
                setAlert({
                  message: response.data.message,
                  type: "danger",
                });
              }

              executeScroll();
            })
            .catch((error) => console.log(error))
        : ""
    );
  }

  const items = [
    {
      name: "Book Titles",
      url: "/book-titles",
    },
    {
      name: bookTitle.name?.substr(0, 15) + "...",
      url: `/book-titles/${bookTitle.id}`,
      active: true,
    },
  ];

  return (
    <>
      <Breadcrumb backLink="/book-titles" items={items} />
      <BookTitle bookTitle={bookTitle} />
      <div className="w-full lg:w-1/2 mx-auto">
        {alert && (
          <Alert
            message={alert.message}
            type={alert.type}
            onClick={() => setAlert(null)}
            ref={alertRef}
          />
        )}
        {auth.isAuthenticated() ? (
          libraries.map((library, index) => (
            <div key={index} className="bg-white p-4 shadow mb-2">
              <div className="flex flex-col sm:flex-row sm:items-center">
                <div className="w-full sm:w-2/3">
                  {library.name}
                  <div key={index}>
                    <b>Stock:</b> {library.stock.amount}
                    <br />
                    <b>Availability:</b>{" "}
                    {library.stock.availability ? (
                      <span className="text-green-500">Available</span>
                    ) : (
                      <span className="text-red-500">Need Votes</span>
                    )}
                  </div>
                </div>
                <div className="w-full sm:w-1/3 mt-4 sm:mt-0">
                  {library.stock.availability ? (
                    <Button
                      type="button"
                      variant="yellow-light"
                      text="Reserve"
                      icon={<TicketIcon className="h-6 mr-1" />}
                      className="min-w-full"
                      onClick={() => reserveBook(library.stock.id)}
                    />
                  ) : userVotes.find(
                      (vote) => vote.stock_id === library.stock.id
                    ) ? (
                    <Button
                      type="button"
                      variant="red-light"
                      text="Remove Vote"
                      icon={<ThumbDownIcon className="h-6 mr-1" />}
                      className="min-w-full"
                      onClick={() => removeVoteBook(library.stock.id)}
                    />
                  ) : (
                    <Button
                      type="button"
                      variant="secondary"
                      text="Vote"
                      icon={<ThumbUpIcon className="h-6 mr-1" />}
                      className="min-w-full"
                      onClick={() => voteBook(library.stock.id)}
                    />
                  )}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="bg-white p-4 shadow mb-2">
            To <b>reserve</b> or <b>vote</b> for this book, you need to{" "}
            <Link to={createRoute("Account")} className="Link">
              Login
            </Link>
            .
          </div>
        )}
      </div>
    </>
  );
};

export default BookTitleShowModule;
