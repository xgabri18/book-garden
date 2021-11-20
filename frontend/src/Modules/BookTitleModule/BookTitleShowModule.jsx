import { BookTitle } from "../../Components/BookTitle/BookTitle";
import { Breadcrumb } from "../../Components/Ui/Breadcrumb";
// import { useParams } from "react-router-dom";
// import { useEffect, useState } from "react";
// import axios from "axios";

// const bookTitleListUrl = "https://book-garden.herokuapp.com/api/booktitle";

const BookTitleShowModule = () => {
  // let { id } = useParams();
  const bookTitle = {
    id: 1,
    name: "Lorem ipsum dolor sit amet jožo ráž a 20 karkuliek o 5 ráno",
    genre: "Adventure",
    description: "Lorem ipsum dolor sit amet",
    price: 15.0,
    rating: 4,
    libraries: ["Library 1", "Library 2", "Library 3"],
  };

  // const [post, setPost] = useState(null);
  //
  // useEffect(() => {
  //   axios.get(bookTitleListUrl).then((response) => {
  //     setPost(response.data);
  //   });
  // });

  const items = [
    {
      name: "Book Titles",
      url: "/book-titles",
    },
    {
      name: bookTitle.name.substr(0, 15) + "...",
      url: `/book-titles/${bookTitle.id}`,
      active: true,
    },
  ];

  return (
    <>
      <Breadcrumb backLink="/book-titles" items={items} />
      <BookTitle bookTitle={bookTitle} />
    </>
  );
};

export default BookTitleShowModule;
