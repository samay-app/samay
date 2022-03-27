import React, { useState } from "react";
import Router from "next/router";
import Head from "next/head";
import { GetServerSideProps } from "next";
import { Col, Row, Container, Jumbotron } from "react-bootstrap";
import dayjs from "dayjs";
import { useSession, getSession } from "next-auth/react";
import localizedFormat from "dayjs/plugin/localizedFormat";
import { getPoll } from "../../src/utils/api/server";
import Layout from "../../src/components/Layout";
import PollInfo from "../../src/components/poll/PollInfo";
import PollTableVoter from "../../src/components/poll/PollTableVoter";
import PollTableAdmin from "../../src/components/poll/PollTableAdmin";
import PollTableVotes from "../../src/components/poll/PollTableVotes";
import DeletePoll from "../../src/components/poll/DeletePoll";
import SubmitTimes from "../../src/components/poll/SubmitTimes";
import SubmitFinalTime from "../../src/components/poll/SubmitFinalTime";
import ResponseMessage from "../../src/components/ResponseMessage";
import ShareInvite from "../../src/components/shareInvite/ShareInvite";
import { isUserPresentInVotes } from "../../src/helpers";
import { TimeFromDB, Vote, Time, PollFromDB } from "../../src/models/poll";

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

  const [finalTime, setFinalTime] = useState<Time | undefined>();

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
    ((loggedInUsername !== "" &&
      !isUserPresentInVotes(loggedInUsername, pollFromDB.votes)) ||
      (pollFromDB.type === "public" && !loggedInUsername))
  )
    hideMarkTimesTable = false;

  if (isPollCreator)
    return (
      <>
        <Head>
          <title>Finalise time | Kukkee</title>
          <link rel="shortcut icon" href="/Kukkee-favicon.svg" />
          <meta name="description" content="Kukkee" />
          <meta charSet="UTF-8" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
        </Head>
        <Layout>
          <div className="kukkee-main-heading">
            <Container className="kukkee-container">Finalise time</Container>
          </div>
          <Container className="kukkee-container">
            <Row className="jumbo-row">
              <Col className="jumbo-col-black">
                <Jumbotron className="poll-info">
                  <Row>
                    <Col sm>
                      <DeletePoll pollID={pollID} setResponse={setResponse} />
                      <PollInfo poll={pollFromDB} />
                      <ShareInvite
                        pollTitle={pollFromDB.title}
                        pollID={pollID}
                        finalTime={pollFromDB.finalTime}
                      />
                    </Col>
                  </Row>
                </Jumbotron>
              </Col>
            </Row>
            <Row className="jumbo-row">
              <Col className="jumbo-col">
                <Jumbotron className="poll-table-jumbo" id="all-votes-table">
                  <PollTableAdmin
                    pollFromDB={pollFromDB}
                    sortedTimes={sortedTimes}
                    setFinalTime={setFinalTime}
                  />
                </Jumbotron>
                {pollFromDB.open && (
                  <SubmitFinalTime
                    finalTime={finalTime}
                    pollID={pollID}
                    setResponse={setResponse}
                  />
                )}
              </Col>
            </Row>
          </Container>
          <ResponseMessage response={response} setResponse={setResponse} />
        </Layout>
      </>
    );
  return (
    <>
      <Head>
        <title>Mark your availablity | Kukkee</title>
        <link rel="shortcut icon" href="/Kukkee-favicon.svg" />
        <meta name="description" content="Kukkee" />
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
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

export const getServerSideProps: GetServerSideProps = async (context) => {
  let pollID = null;
  if (context.params) {
    pollID = context.params.id;
  }
  const {
    headers: { cookie },
  } = context.req;

  const session = await getSession(context);

  const getPollResponse = await getPoll(pollID, cookie);

  if (getPollResponse.statusCode === 401) {
    return {
      redirect: {
        destination: `/auth/signin?from=/poll/${pollID}`,
        permanent: false,
      },
    };
  }

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
    props: { pollFromDB, pollID, session },
  };
};

export default Poll;
