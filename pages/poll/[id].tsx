import React, { useState } from "react";
import { GetServerSideProps } from "next";
import { Container, Row, Col, Table } from "react-bootstrap";
import { useSelector } from "react-redux";
import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
import Layout from "../../src/components/layout";
import PollInfo from "../../src/components/PollInfo";
import MarkChoices from "../../src/components/MarkChoices";
import MarkFinalChoice from "../../src/components/MarkFinalChoice";
import SubmitChoices from "../../src/components/SubmitChoices";
import SubmitFinalChoice from "../../src/components/SubmitFinalChoice";
import {
  Choice,
  ChoiceFromDB,
  Vote,
  RocketMeetPollFromDB,
} from "../../src/models/poll";
import {
  decrypt,
  isChoicePresentInPollChoices,
} from "../../src/helpers/helpers";
import ShareInvite from "../../src/components/shareinvite";
import { RootState } from "../../src/store/store";

dayjs.extend(localizedFormat);

const Poll = (props: {
  pollFromDB: RocketMeetPollFromDB;
  pollid: string;
}): JSX.Element => {
  const { pollFromDB, pollid } = props;
  const pollCreatorEmailID = decrypt(pollFromDB.emailID);
  const loggedInUserEmailID = useSelector(
    (state: RootState) => state.authReducer.username
  );
  const sortedChoices: ChoiceFromDB[] = pollFromDB.choices.sort(
    (a: ChoiceFromDB, b: ChoiceFromDB) => a.start - b.start
  );
  const [newVote, setNewVote] = useState<Vote>({
    name: "",
    choices: [],
  });
  const [finalChoice, setFinalChoice] = useState<Choice | undefined>();

  return (
    <Layout>
      <Container className="outer-container" fluid>
        <Row className="outer-container poll">
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
                {pollFromDB.votes?.map((vote: Vote) => (
                  <tr key={vote.name}>
                    <td>{vote.name}</td>
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
                  loggedInUserEmailID !== pollCreatorEmailID && (
                    <MarkChoices
                      choices={sortedChoices}
                      newVote={newVote}
                      setNewVote={setNewVote}
                    />
                  )}
                {pollFromDB.open &&
                  loggedInUserEmailID === pollCreatorEmailID && (
                    <MarkFinalChoice
                      choices={sortedChoices}
                      setFinalChoice={setFinalChoice}
                    />
                  )}
              </tbody>
            </Table>
            {pollFromDB.open && loggedInUserEmailID !== pollCreatorEmailID && (
              <SubmitChoices newVote={newVote} pollid={pollid} />
            )}
            {pollFromDB.open && loggedInUserEmailID === pollCreatorEmailID && (
              <SubmitFinalChoice finalChoice={finalChoice} pollid={pollid} />
            )}
          </Col>
        </Row>
        {pollFromDB.open && loggedInUserEmailID === pollCreatorEmailID && (
          <Row className="outer-container share justify-content-center">
            <ShareInvite pollid={pollid} />
          </Row>
        )}
      </Container>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const pollid = context.params.id;
  const res = await fetch(`http://localhost:5000/v1/poll/${pollid}`);
  const { status } = res;
  const pollFromDB = await res.json();

  if (status === 404) {
    return {
      redirect: {
        destination: "/404",
        permanent: false,
      },
    };
  }
  return {
    props: { pollFromDB, pollid }, // will be passed to the page component as props
  };
};

export default Poll;
