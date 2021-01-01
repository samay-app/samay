import { Container, Row, Col, Table } from "react-bootstrap";
import { useState } from "react";
import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
import Layout from "../../components/layout";
import PollInfo from "../../components/PollInfo";
import MarkChoices from "../../components/MarkChoices";
import MarkFinalChoice from "../../components/MarkFinalChoice";
import SubmitChoices from "../../components/SubmitChoices";
import SubmitFinalChoice from "../../components/SubmitFinalChoice";
import { PollFromDBProps, MarkedProps } from "../../models/poll";

dayjs.extend(localizedFormat);

const currentLoggedInUserID = "starman"; // get the correct user

const Poll = (): JSX.Element => {
  // get poll from DB
  const pollFromDB: PollFromDBProps = {
    _id: "5fecb40047984b4c55764b5e",
    name: "testPoll",
    description: "testPollDescription",
    open: false,
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
    finalChoice: 1609855679000,
    createdAt: "2020-12-30T17:08:16.765Z",
    updatedAt: "2020-12-30T17:08:16.765Z",
    __v: 0,
  };

  const sortedChoices = pollFromDB.choices.sort((a, b) => a - b);

  const [newMarked, setNewMarked] = useState<MarkedProps>({
    userID: "",
    choices: [],
  });

  const [finalChoice, setFinalChoice] = useState<number | undefined>();

  return (
    <Layout>
      <Container fluid>
        <Row>
          <Col>
            <PollInfo pollFromDB={pollFromDB} />
            <Table bordered>
              <thead>
                <tr>
                  <th>
                    {pollFromDB.marked ? pollFromDB.marked.length : 0}{" "}
                    participants
                  </th>
                  {sortedChoices.map((idx) => (
                    <th
                      key={idx}
                      className={
                        idx === pollFromDB.finalChoice
                          ? "slot-final-chosen-cell"
                          : ""
                      }
                    >
                      {dayjs(idx).format("llll")} -{" "}
                      {dayjs(idx + pollFromDB.interval).format("LT")}
                    </th>
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
                {pollFromDB.open &&
                  currentLoggedInUserID !== pollFromDB.userID && (
                    <MarkChoices
                      sortedChoices={sortedChoices}
                      newMarked={newMarked}
                      setNewMarked={setNewMarked}
                    />
                  )}
                {pollFromDB.open &&
                  currentLoggedInUserID === pollFromDB.userID && (
                    <MarkFinalChoice
                      sortedChoices={sortedChoices}
                      setFinalChoice={setFinalChoice}
                    />
                  )}
              </tbody>
            </Table>
            {pollFromDB.open && currentLoggedInUserID !== pollFromDB.userID && (
              <SubmitChoices newMarked={newMarked} />
            )}
            {pollFromDB.open && currentLoggedInUserID === pollFromDB.userID && (
              <SubmitFinalChoice finalChoice={finalChoice} />
            )}
          </Col>
        </Row>
      </Container>
    </Layout>
  );
};

export default Poll;
