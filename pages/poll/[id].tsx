import React, { useState } from "react";
import { GetServerSideProps } from "next";
import { Col, Row, Container, Jumbotron } from "react-bootstrap";
import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
import { getPoll } from "../../src/utils/api/server";
import Layout from "../../src/components/Layout";
import PollInfo from "../../src/components/poll/PollInfo";
import PollTableVoter from "../../src/components/poll/PollTableVoter";
import PollTableVotes from "../../src/components/poll/PollTableVotes";
import SubmitChoices from "../../src/components/poll/SubmitChoices";
import { ChoiceFromDB, Vote, PollFromDB } from "../../src/models/poll";

dayjs.extend(localizedFormat);

const Poll = (props: {
  pollFromDB: PollFromDB;
  pollID: string;
}): JSX.Element => {
  const { pollFromDB, pollID } = props;
  const sortedChoices: ChoiceFromDB[] = pollFromDB.choices.sort(
    (a: ChoiceFromDB, b: ChoiceFromDB) => a.start - b.start
  );
  const [newVote, setNewVote] = useState<Vote>({
    name: "",
    choices: [],
  });

  return (
    <Layout>
      <Container className="rm-container">
        <Row className="jumbo-row">
          <Col className="jumbo-col-black">
            <Jumbotron className="poll-info">
              <Row>
                <Col sm>
                  <PollInfo poll={pollFromDB} />
                </Col>
              </Row>
            </Jumbotron>
          </Col>
        </Row>
        <Row className="jumbo-row">
          <Col className="jumbo-col">
            <Jumbotron className="poll-table-jumbo">
              <PollTableVoter
                pollFromDB={pollFromDB}
                sortedChoices={sortedChoices}
                newVote={newVote}
                setNewVote={setNewVote}
              />
            </Jumbotron>
          </Col>
          <Col className="jumbo-col">
            {pollFromDB.open && (
              <SubmitChoices
                newVote={newVote}
                pollID={pollID}
                pollFromDB={pollFromDB}
              />
            )}
          </Col>
          <Col className="jumbo-col">
            <Jumbotron className="poll-table-jumbo">
              <PollTableVotes
                pollFromDB={pollFromDB}
                sortedChoices={sortedChoices}
              />
            </Jumbotron>
          </Col>
        </Row>
      </Container>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  let pollID = null;
  if (context.params) {
    pollID = context.params.id;
  }
  const getPollResponse = await getPoll(pollID);
  const pollFromDB = getPollResponse.data;

  if (getPollResponse.statusCode === 404) {
    return {
      redirect: {
        destination: "/404",
        permanent: false,
      },
    };
  }
  return {
    props: { pollFromDB, pollID }, // will be passed to the page component as props
  };
};

export default Poll;
