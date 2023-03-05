import React, { useState } from "react";
import Router from "next/router";
import Head from "next/head";
import { GetServerSideProps } from "next";
import { Form } from "react-bootstrap";
import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
import { getPoll } from "../../src/utils/api/server";
import Layout from "../../src/components/Layout";
import VoterPollInfo from "../../src/components/poll/VoterPollInfo";
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

  let pageSection = <></>;

  const sortedTimes: TimeFromDB[] = pollFromDB.times.sort(
    (a: TimeFromDB, b: TimeFromDB) => a.start - b.start
  );

  const [newVote, setNewVote] = useState<Vote>({
    name: "",
    times: [],
  });

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { value } = e.target;
    setNewVote({ name: value, times: newVote.times });
  };

  const [response, setResponse] = useState({
    status: false,
    msg: "",
  });

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

    if (votedPollsFromLS.polls.length) {
      for (let i = 0; i < votedPollsFromLS.polls.length; i += 1) {
        let poll = votedPollsFromLS.polls[i];

        if (Object.keys(poll)[0] === pollID && pollFromDB.open) {
          pageSection = (
            <div className="voter-page-final-container">
              <span className="voter-page-vote-recorded">
                Your vote has been successfully recorded.
              </span>
            </div>
          );
          break;
        } else if (pollFromDB.open) {
          pageSection = (
            <>
              <div className="voter-page-main-container">
                <PollTableVoter
                  pollFromDB={pollFromDB}
                  sortedTimes={sortedTimes}
                  newVote={newVote}
                  setNewVote={setNewVote}
                />
              </div>
              <div className="voter-page-final-container">
                <Form.Control
                  className="voter-page-poll-mark-time-name"
                  type="text"
                  maxLength={30}
                  placeholder="Your name"
                  onChange={handleNameChange}
                  autoFocus
                />
                <SubmitTimes
                  newVote={newVote}
                  pollID={pollID}
                  pollFromDB={pollFromDB}
                  setResponse={setResponse}
                />
              </div>
            </>
          );
        }
      }
    } else if (pollFromDB.open) {
      pageSection = (
        <>
          <div className="voter-page-main-container">
            <PollTableVoter
              pollFromDB={pollFromDB}
              sortedTimes={sortedTimes}
              newVote={newVote}
              setNewVote={setNewVote}
            />
          </div>
          <div className="voter-page-final-container">
            <Form.Control
              className="voter-page-poll-mark-time-name"
              type="text"
              maxLength={30}
              placeholder="Your name"
              onChange={handleNameChange}
              autoFocus
            />
            <SubmitTimes
              newVote={newVote}
              pollID={pollID}
              pollFromDB={pollFromDB}
              setResponse={setResponse}
            />
          </div>
        </>
      );
    }
  }

  return (
    <>
      <Head>
        <title>Kukkee — Mark your availability</title>
        <link rel="shortcut icon" href="/favicon.svg" />
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <div className="global-flex-wrapper">
        <main className="voter-page-main">
          <div
            className={`voter-page-info-container ${
              pollFromDB.open ? "" : "closed"
            }`}
          >
            <VoterPollInfo poll={pollFromDB} showFinalTime={!pollFromDB.open} />
          </div>
          {pageSection}
          <ResponseMessage response={response} setResponse={setResponse} />
        </main>
      </div>
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
