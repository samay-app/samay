import { Container, Row, Col, Table } from "react-bootstrap";
import { useState } from "react";
import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
import Layout from "../../src/components/layout";
import PollInfo from "../../src/components/PollInfo";
import MarkChoices from "../../src/components/MarkChoices";
import MarkFinalChoice from "../../src/components/MarkFinalChoice";
import SubmitChoices from "../../src/components/SubmitChoices";
import SubmitFinalChoice from "../../src/components/SubmitFinalChoice";
import { Choice, PollFromDB, Vote } from "../../src/models/poll";
import isPollChoicePresent from "../../src/helpers/helpers";
dayjs.extend(localizedFormat);

const currentLoggedInUserID = "haha"; // get the correct user

const Poll = (): JSX.Element => {
  // get poll from DB
  const pollFromDB: RocketMeetPollFromDB = {
    _id: "5fecb40047984b4c55764b5e",
    title: "testPoll",
    description: "testPollDescription",
    open: true,
    userID: "starman",
    choices: [
      {
        _id: "5ff178e65455b8fc6b81f591",
        start: 1633577400000,
        end: 1633581000000,
      },
      {
        _id: "5ff178e65455b8fc6b81f592",
        start: 1633588200000,
        end: 1633591800000,
      },
      {
        _id: "5ff178e65455b8fc6b81f593",
        start: 1633667400000,
        end: 1633671000000,
      },
      {
        _id: "5ff178e65455b8fc6b81f594",
        start: 1633671000000,
        end: 1633674600000,
      },
    ],
    votes: [
      {
        _id: "5ff178e65455b8fc6b81f594",
        userID: "aryansuserid",
        choices: [
          {
            _id: "5ff178e65455b8fc6b81f594",
            start: 1633667400000,
            end: 1633671000000,
          },
          {
            _id: "5ff178e65455b8fc6b81f594",
            start: 1633577400000,
            end: 1633581000000,
          },
        ],
      },
      {
        _id: "5ff178e65455b8fc6b81f594",
        userID: "suhailsuserid",
        choices: [
          {
            _id: "5ff178e65455b8fc6b81f594",
            start: 1633577400000,
            end: 1633581000000,
          },
        ],
      },
      {
        _id: "5ff178e65455b8fc6b81f594",
        userID: "anandsuserid",
        choices: [
          {
            _id: "5ff178e65455b8fc6b81f594",
            start: 1633588200000,
            end: 1633591800000,
          },
        ],
      },
      {
        _id: "5ff178e65455b8fc6b81f594",
        userID: "anaswarasuserid",
        choices: [
          {
            _id: "5ff178e65455b8fc6b81f594",
            start: 1633577400000,
            end: 1633581000000,
          },
        ],
      },
    ],
    createdAt: "2020-12-30T17:08:16.765Z",
    updatedAt: "2020-12-30T17:08:16.765Z",
    __v: 0,
  };

  const sortedChoices: Choice[] = pollFromDB.choices.sort(
    (a, b) => a.start - b.start
  );

  const [newVote, setNewVote] = useState<Vote>({
    userID: "",
    choices: [],
  });

  const [finalChoice, setFinalChoice] = useState<Choice | undefined>();

  return (
    <Layout>
      <Container fluid>
        <Row>
          <Col>
            <PollInfo poll={pollFromDB} />
            <Table bordered>
              <thead>
                <tr>
                  <th>
                    {pollFromDB.votes ? pollFromDB.votes.length : 0}{" "}
                    participants
                  </th>
                  {sortedChoices.map((choice) => (
                    <th
                      key={choice.start}
                      className={
                        choice.start === pollFromDB.finalChoice?.start &&
                          choice.end === pollFromDB.finalChoice?.end
                          ? "slot-final-chosen-cell"
                          : ""
                      }
                    >
                      {dayjs(choice.start).format("llll")} -{" "}
                      {dayjs(choice.end).format("LT")}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {pollFromDB.votes?.map((vote) => (
                  <tr key={vote.userID}>
                    <td>{vote.userID}</td>
                    {sortedChoices.map((choice) => (
                      <td
                        key={choice.start}
                        className={
                          isChoicePresentInPollChoices(choice, vote.choices)
                            ? "slot-checked"
                            : "slot-unchecked"
                        }
                      >
                        {isChoicePresentInPollChoices(choice, vote.choices)
                          ? "✔"
                          : ""}
                      </td>
                    ))}
                  </tr>
                ))}
                {pollFromDB.open &&
                  currentLoggedInUserID !== pollFromDB.userID && (
                    <MarkChoices
                      choices={sortedChoices}
                      newVote={newVote}
                      setNewVote={setNewVote}
                    />
                  )}
                {pollFromDB.open &&
                  currentLoggedInUserID === pollFromDB.userID && (
                    <MarkFinalChoice
                      choices={sortedChoices}
                      setFinalChoice={setFinalChoice}
                    />
                  )}
              </tbody>
            </Table>
            {pollFromDB.open && currentLoggedInUserID !== pollFromDB.userID && (
              <SubmitChoices newVote={newVote} />
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
