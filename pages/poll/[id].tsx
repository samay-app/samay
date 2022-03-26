import React, { useState } from "react";
import Router from "next/router";
import { GetServerSideProps } from "next";
import { Col, Row, Container, Jumbotron } from "react-bootstrap";
import { PeopleFill } from "react-bootstrap-icons";
import dayjs from "dayjs";
import { useSession, getSession } from "next-auth/react";
import localizedFormat from "dayjs/plugin/localizedFormat";
import { getPoll } from "../../src/utils/api/server";
import Layout from "../../src/components/Layout";
import PollInfo from "../../src/components/poll/PollInfo";
import PollTableVoter from "../../src/components/poll/PollTableVoter";
import PollTableVotes from "../../src/components/poll/PollTableVotes";
import SubmitTimes from "../../src/components/poll/SubmitTimes";
import ResponseMessage from "../../src/components/ResponseMessage";
import { isUserPresentInVotes } from "../../src/helpers";
import { TimeFromDB, Vote, PollFromDB } from "../../src/models/poll";

dayjs.extend(localizedFormat);

const Poll = (props: {
  pollFromDB: PollFromDB;
  pollID: string;
}): JSX.Element => {
  const { pollFromDB, pollID } = props;

  let isPollCreator = false;
  let loggedInUsername = "";

  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      if (pollFromDB.type === "protected") {
        Router.push({
          pathname: "/auth/signin",
          query: { from: `/poll/${pollID}` },
        });
      }
    },
  });

  const sortedTimes: TimeFromDB[] = pollFromDB.times.sort(
    (a: TimeFromDB, b: TimeFromDB) => a.start - b.start
  );
  const [newVote, setNewVote] = useState<Vote>({
    username: "",
    times: [],
  });
  const [response, setResponse] = useState({
    status: false,
    msg: "",
  });

  if (!session && pollFromDB.type === "protected") return <></>;

  if (session) {
    loggedInUsername = session.username ? session.username : "";
    isPollCreator = session.username === pollFromDB.username;
  }

  let hideMarkTimesTable = true;

  if (
    pollFromDB.open &&
    ((pollFromDB.type === "protected" &&
      loggedInUsername !== "" &&
      !isUserPresentInVotes(loggedInUsername, pollFromDB.votes)) ||
      (pollFromDB.open && pollFromDB.type === "public"))
  )
    hideMarkTimesTable = false;

  return (
    <Layout>
      <div className="kukkee-main-heading">
        <Container className="kukkee-container">
          Mark your availablity
        </Container>
      </div>
      <Container className="kukkee-container">
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
                pollFromDB={pollFromDB}
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
        {pollFromDB.open && pollFromDB.votes && pollFromDB.votes?.length > 0 && (
          <Row className="jumbo-row">
            <Col className="jumbo-col">
              <PeopleFill className="votes-table-icon" />
              <span className="votes-table-title">Participants</span>
              <Jumbotron className="poll-table-jumbo" id="all-votes-table-open">
                <PollTableVotes
                  pollFromDB={pollFromDB}
                  sortedTimes={sortedTimes}
                />
              </Jumbotron>
            </Col>
          </Row>
        )}
        {!pollFromDB.open && pollFromDB.votes && pollFromDB.votes?.length > 0 && (
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
    props: { pollFromDB, pollID, session: await getSession(context) },
  };
};

export default Poll;
