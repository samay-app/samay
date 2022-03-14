import React, { useState } from "react";
import Router from "next/router";
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
import ResponseMessage from "../../src/components/ResponseMessage";
import { ChoiceFromDB, Vote, PollFromDB } from "../../src/models/poll";
import { decrypt } from "../../src/helpers";

dayjs.extend(localizedFormat);

const Poll = (props: {
  pollFromDB: PollFromDB;
  pollID: string;
}): JSX.Element => {
  const { pollFromDB, pollID } = props;

  if (typeof window !== "undefined") {
    if (localStorage[pollID] === "creator") {
      Router.push(`/poll/${pollID}/${decrypt(pollFromDB.secret)}`);
    }
  }

  const sortedChoices: ChoiceFromDB[] = pollFromDB.choices.sort(
    (a: ChoiceFromDB, b: ChoiceFromDB) => a.start - b.start
  );
  const [newVote, setNewVote] = useState<Vote>({
    name: "",
    choices: [],
  });
  const [response, setResponse] = useState({
    status: false,
    msg: "",
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
        {pollFromDB.open && (
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
          </Row>
        )}
        {pollFromDB.open && (
          <Row className="jumbo-row">
            <Col className="jumbo-col">
              <SubmitChoices
                newVote={newVote}
                pollID={pollID}
                pollFromDB={pollFromDB}
                setResponse={setResponse}
              />
            </Col>
          </Row>
        )}
        {pollFromDB.votes && pollFromDB.votes?.length > 0 && (
          <Row className="jumbo-row">
            <Col className="jumbo-col">
              <Jumbotron className="poll-table-jumbo" id="all-votes-table">
                <PollTableVotes
                  pollFromDB={pollFromDB}
                  sortedChoices={sortedChoices}
                />
              </Jumbotron>
            </Col>
          </Row>
        )}
      </Container>
      <ResponseMessage response={response} setResponse={setResponse} />
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
