import React, { useState } from "react";
import Head from "next/head";
import { Container, Jumbotron } from "react-bootstrap";
import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
import Layout from "../Layout";
import PollInfo from "./PollInfo";
import PollTableVoter from "./PollTableVoter";
import PollTableVotes from "./PollTableVotes";
import SubmitTimes from "./SubmitTimes";
import ResponseMessage from "../ResponseMessage";
import { Vote, TimeFromDB, PollFromDB } from "../../models/poll";

const NEXT_PUBLIC_BRAND_NAME = process.env.NEXT_PUBLIC_BRAND_NAME || "";

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
        <title>Mark your availablity | {NEXT_PUBLIC_BRAND_NAME}</title>
        <link rel="shortcut icon" href="/logo.svg" />
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <Layout>
        <div className="global-page-heading">
          <Container className="global-container">
            Mark your availablity
          </Container>
        </div>
        <div className="global-page-section">
          <Container className="global-container">
            <Jumbotron className="poll-info-jumbo">
              <PollInfo poll={pollFromDB} />
            </Jumbotron>
            <Jumbotron
              className="poll-table-jumbo first"
              hidden={hideMarkTimesTable}
            >
              <PollTableVoter
                loggedInUsername={loggedInUsername}
                sortedTimes={sortedTimes}
                newVote={newVote}
                setNewVote={setNewVote}
              />
            </Jumbotron>
            <SubmitTimes
              newVote={newVote}
              pollID={pollID}
              hidden={hideMarkTimesTable}
              pollFromDB={pollFromDB}
              setResponse={setResponse}
            />
            {pollFromDB.votes && pollFromDB.votes?.length > 0 && (
              <Jumbotron
                className={`poll-table-jumbo ${
                  !pollFromDB.open ? "first" : "second"
                }`}
              >
                <PollTableVotes
                  pollFromDB={pollFromDB}
                  sortedTimes={sortedTimes}
                />
              </Jumbotron>
            )}
          </Container>
        </div>
        <ResponseMessage response={response} setResponse={setResponse} />
      </Layout>
    </>
  );
};

export default PollVoter;
