import React, { useState } from "react";
import Router from "next/router";
import Head from "next/head";
import { GetServerSideProps } from "next";
import { Container, Jumbotron } from "react-bootstrap";
import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
import { getPoll } from "../../src/utils/api/server";
import Layout from "../../src/components/Layout";
import PollInfo from "../../src/components/poll/PollInfo";
import PollTableVoter from "../../src/components/poll/PollTableVoter";
import SubmitTimes from "../../src/components/poll/SubmitTimes";
import ResponseMessage from "../../src/components/ResponseMessage";
import { TimeFromDB, Vote, PollFromDB } from "../../src/models/poll";
import { decrypt } from "../../src/helpers";

dayjs.extend(localizedFormat);

const Poll = (props: {
  pollFromDB: PollFromDB;
  pollID: string;
}): JSX.Element => {
  const { pollFromDB, pollID } = props;

  let hasAlreadyVoted = false;

  if (typeof window !== "undefined") {
    let createdPollsFromLS = JSON.parse(
      localStorage.getItem("kukkeeCreatedPolls")
    );

    if (createdPollsFromLS) {
      const lSKeyForPoll = `${pollID}-${
        pollFromDB.title ? pollFromDB.title : ""
      }`;

      for (let i = 0; i < createdPollsFromLS.polls.length; i += 1) {
        let poll = createdPollsFromLS.polls[i];

        if (
          Object.keys(poll)[0] === lSKeyForPoll &&
          poll[Object.keys(poll)[0]] === pollFromDB.secret
        ) {
          Router.push(`/poll/${pollID}/${decrypt(pollFromDB.secret)}`);
        }
      }
    }

    let votedPollsFromLS = JSON.parse(localStorage.getItem("kukkeeVotedPolls"));

    if (votedPollsFromLS) {
      for (let i = 0; i < votedPollsFromLS.polls.length; i += 1) {
        let poll = votedPollsFromLS.polls[i];

        if (Object.keys(poll)[0] === pollID) {
          hasAlreadyVoted = true;
        }
      }
    }
  }

  const sortedTimes: TimeFromDB[] = pollFromDB.times.sort(
    (a: TimeFromDB, b: TimeFromDB) => a.start - b.start
  );
  const [newVote, setNewVote] = useState<Vote>({
    name: "",
    times: [],
  });
  const [response, setResponse] = useState({
    status: false,
    msg: "",
  });
  return (
    <>
      <Head>
        <title>Kukkee — Mark your availability</title>
        <link rel="shortcut icon" href="/favicon.svg" />
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <Layout>
        <div className="global-page-section">
          <Container className="global-container">
            <Jumbotron className="poll-info-jumbo">
              <PollInfo
                poll={pollFromDB}
                showFinalTime={!pollFromDB.open}
                showCopyBox={false}
              />
            </Jumbotron>
            {pollFromDB.open && !hasAlreadyVoted && (
              <Jumbotron className="poll-table-jumbo">
                <PollTableVoter
                  pollFromDB={pollFromDB}
                  sortedTimes={sortedTimes}
                  newVote={newVote}
                  setNewVote={setNewVote}
                />
              </Jumbotron>
            )}
            {pollFromDB.open && hasAlreadyVoted && (
              <Jumbotron className="poll-message">
                Your vote has been successfully recorded.
              </Jumbotron>
            )}
            {pollFromDB.open && !hasAlreadyVoted && (
              <SubmitTimes
                newVote={newVote}
                pollID={pollID}
                pollFromDB={pollFromDB}
                setResponse={setResponse}
              />
            )}
          </Container>
          <ResponseMessage response={response} setResponse={setResponse} />
        </div>
      </Layout>
    </>
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
