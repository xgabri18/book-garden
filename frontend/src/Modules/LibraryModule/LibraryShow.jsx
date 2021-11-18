import { useParams } from "react-router-dom";

const LibraryShow = () => {
  const { id } = useParams();

  return <div>Library ID: {id}</div>;
};

export default LibraryShow;
