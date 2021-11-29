import { useEffect, useState } from "react";
import axios from "axios";
import { createAPI } from "../../api";
import { Button, ButtonLink } from "../../Components/Ui/Button";
import { ChevronLeftIcon, ThumbDownIcon } from "@heroicons/react/outline";
import { Alert } from "../../Components/Ui/Alert";
import { PingLoading } from "../../Components/Ui/PingLoading";
import {
  Table,
  TableCol,
  TableColHead,
  TableRow,
  Tbody,
  Thead,
} from "../../Components/Ui/Table";
import auth from "../../auth";

export const AccountVotingModule = () => {
  const [voting, setVoting] = useState([]);
  const [alert, setAlert] = useState(null);

  useEffect(() => {
    setVoting([]);

    axios
      .get(createAPI("voting/votesofperson/:id", { id: auth.id }))
      .then((response) =>
        response.data.data.map((voting) =>
          axios
            .get(createAPI("stockinfo/:id", { id: voting.id }))
            .then((response) => {
              if (response.data.status === "success") {
                voting.stock = response.data.data;
                setVoting((state) => [...state, voting]);
              }
            })
        )
      )
      .catch((error) => console.log(error));
  }, [alert]);

  function removeVoteBook(id) {
    axios
      .delete(createAPI("voting/:id", { id: id }))
      .then(() => {
        window.scrollTo(0, 0);
        return setAlert({ message: "Vote has been removed", type: "success" });
      })
      .catch((error) => console.log(error));
  }

  return (
    <>
      <div className="flex justify-between">
        <ButtonLink
          to="/account/profile"
          variant="secondary"
          icon={<ChevronLeftIcon className="h-6 mr-0 md:mr-1" />}
          text="Back"
        />
      </div>
      <div className="Content mt-4">
        {alert && (
          <Alert
            message={alert.message}
            type={alert.type}
            onClick={() => setAlert(null)}
          />
        )}
        <h1 className="Content-Title relative">
          Your votes {!voting.length ? <PingLoading /> : ""}
        </h1>

        <div className="overflow-auto">
          <Table>
            <Thead>
              <TableRow>
                <TableColHead>#</TableColHead>
                <TableColHead>Library</TableColHead>
                <TableColHead>Book</TableColHead>
                <TableColHead>Actions</TableColHead>
              </TableRow>
            </Thead>
            <Tbody>
              {voting.map((voting, index) => (
                <TableRow key={index} index={index} striped>
                  <TableCol>{voting.id}</TableCol>
                  <TableCol>{voting.stock.Library_name}</TableCol>
                  <TableCol>{voting.stock.Book_title}</TableCol>
                  <TableCol>
                    <Button
                      type="button"
                      variant="red-light"
                      text="Remove Vote"
                      icon={<ThumbDownIcon className="h-6 mr-0 lg:mr-1" />}
                      showText="lg"
                      onClick={() => removeVoteBook(voting.id)}
                    />
                  </TableCol>
                </TableRow>
              ))}
            </Tbody>
          </Table>
        </div>
      </div>
    </>
  );
};
