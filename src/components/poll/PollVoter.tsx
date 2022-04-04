import React, { useState } from "react";
import Head from "next/head";
import { Col, Row, Container, Jumbotron } from "react-bootstrap";
import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
import Layout from "../Layout";
import PollInfo from "./PollInfo";
import PollTableVoter from "./PollTableVoter";
import PollTableVotes from "./PollTableVotes";
import SubmitTimes from "./SubmitTimes";
import ResponseMessage from "../ResponseMessage";
import { Vote, TimeFromDB, PollFromDB } from "../../models/poll";

dayjs.extend(localizedFormat);

const PollVoter = (props: {
  pollFromDB: PollFromDB;
  pollID: string;
  hideMarkTimesTable: boolean;
  loggedInUsername: string;
  sortedTimes: TimeFromDB[];
}): JSX.Element => {
  const {
    pollFromDB,
    pollID,
    hideMarkTimesTable,
    loggedInUsername,
    sortedTimes,
  } = props;

  const [newVote, setNewVote] = useState<Vote>({
    username: `${loggedInUsername || ""}`,
    times: [],
  });

  const [response, setResponse] = useState({
    status: false,
    msg: "",
  });

  return (
    <>
      <Head>
        <title>Mark your availablity | Kukkee</title>
        <link rel="shortcut icon" href="/logo.svg" />
        <meta name="description" content="Kukkee" />
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <Layout>
        <div className="global-page-heading">
          <Container className="global-container">
            Mark your availablity
          </Container>
        </div>
        <Container className="global-container">
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
          <Row className="jumbo-row" hidden={hideMarkTimesTable}>
            <Col className="jumbo-col">
              <Jumbotron className="poll-table-jumbo">
                <PollTableVoter
                  loggedInUsername={loggedInUsername}
                  sortedTimes={sortedTimes}
                  newVote={newVote}
                  setNewVote={setNewVote}
                />
              </Jumbotron>
            </Col>
          </Row>
          <Row className="jumbo-row" hidden={hideMarkTimesTable}>
            <Col className="jumbo-col">
              <SubmitTimes
                newVote={newVote}
                pollID={pollID}
                pollFromDB={pollFromDB}
                setResponse={setResponse}
              />
            </Col>
          </Row>
          {pollFromDB.votes && pollFromDB.votes?.length > 0 && (
            <Row className="jumbo-row">
              <Col className="jumbo-col">
                <Jumbotron className="poll-table-jumbo" id="all-votes-table">
                  <PollTableVotes
                    pollFromDB={pollFromDB}
                    sortedTimes={sortedTimes}
                  />
                </Jumbotron>
              </Col>
            </Row>
          )}
        </Container>
        <ResponseMessage response={response} setResponse={setResponse} />
      </Layout>
    </>
  );
};

export default PollVoter;
