import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const bookTitleListUrl = "https://book-garden.herokuapp.com/api/booktitle";

const BookTitleShowModule = () => {
  let { id } = useParams();

  const [post, setPost] = useState(null);

  useEffect(() => {
    axios.get(bookTitleListUrl).then((response) => {
      setPost(response.data);
    });
  });

  return <div>ID: {post}</div>;
};

export default BookTitleShowModule;
