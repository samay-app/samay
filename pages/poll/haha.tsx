import { Alert, Container, Row, Col, Table } from "react-bootstrap";
import { useState } from "react";
import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
import Layout from "../../components/layout";
import MarkChoices from "../../components/MarkChoices";
import SubmitChoices from "../../components/SubmitChoices";
import { PollFromDBProps, MarkedProps } from "../../models/poll";

dayjs.extend(localizedFormat);

const currentLoggedInUserID = "starman"; // get the correct user

const Poll = (): JSX.Element => {
  const pollFromDB: PollFromDBProps = {
    _id: "5fecb40047984b4c55764b5e",
    name: "testPoll",
    description: "testPollDescription",
    open: true,
    userID: "starman",
    interval: 3600000,
    choices: [
      1700562600000,
      1700566200000,
      1609855679000,
      2200268206000,
      1900532600000,
      1604353655000,
    ],
    marked: [
      {
        userID: "aryansuserid",
        choices: [1609855679000, 2200268206000],
      },
      {
        userID: "suhailsuserid",
        choices: [1609855679000, 1700566200000],
      },
      {
        userID: "anandsuserid",
        choices: [1700562600000, 1900532600000],
      },
      {
        userID: "anaswarasuserid",
        choices: [2200268206000],
      },
    ],
    createdAt: "2020-12-30T17:08:16.765Z",
    updatedAt: "2020-12-30T17:08:16.765Z",
    __v: 0,
  };

  const sortedChoices = pollFromDB.choices.sort((a, b) => a - b);

  const [newUserMarked, setNewUserMarked] = useState<MarkedProps>({
    userID: "",
    choices: [],
  });

  return (
    <Layout>
      <Container fluid>
        <Row>
          <Col>
            <h1>{pollFromDB.name}</h1>
            {pollFromDB.description}
            <Alert variant={pollFromDB.open ? "success" : "secondary"}>
              {pollFromDB.open ? "OPEN" : "CLOSED"}
            </Alert>
            By {pollFromDB.userID} | Created on{" "}
            {dayjs(pollFromDB.createdAt).format("DD/MM/YYYY")}
            <Table bordered>
              <thead>
                <tr>
                  <th>
                    {pollFromDB.marked ? pollFromDB.marked.length : 0}{" "}
                    participants
                  </th>
                  {sortedChoices.map((idx) => (
                    <th key={idx}>{dayjs(idx).format("llll")}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {pollFromDB.marked?.map((idx) => (
                  <tr key={idx.userID}>
                    <td>{idx.userID}</td>
                    {sortedChoices.map((choiceIdx) => (
                      <td
                        key={choiceIdx}
                        className={
                          idx.choices.includes(choiceIdx)
                            ? "slot-checked"
                            : "slot-unchecked"
                        }
                      >
                        {idx.choices.includes(choiceIdx) ? "✔" : ""}
                      </td>
                    ))}
                  </tr>
                ))}
                {currentLoggedInUserID !== pollFromDB.userID && (
                  <MarkChoices
                    pollFromDB={pollFromDB}
                    newUserMarked={newUserMarked}
                    setNewUserMarked={setNewUserMarked}
                  />
                )}
              </tbody>
            </Table>
            {currentLoggedInUserID !== pollFromDB.userID && (
              <SubmitChoices newUserMarked={newUserMarked} />
            )}
          </Col>
        </Row>
      </Container>
    </Layout>
  );
};

export default Poll;
