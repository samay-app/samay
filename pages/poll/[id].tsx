import React from "react";
import Router from "next/router";
import { GetServerSideProps } from "next";
import dayjs from "dayjs";
import { useSession, getSession } from "next-auth/react";
import localizedFormat from "dayjs/plugin/localizedFormat";
import { getPoll } from "../../src/utils/api/server";
import PollVoter from "../../src/components/poll/PollVoter";
import PollAdmin from "../../src/components/poll/PollAdmin";
import { isUserPresentInVotes } from "../../src/helpers";
import { TimeFromDB, PollFromDB } from "../../src/models/poll";

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
      <PollAdmin
        pollFromDB={pollFromDB}
        pollID={pollID}
        sortedTimes={sortedTimes}
      />
    );
  return (
    <PollVoter
      pollFromDB={pollFromDB}
      pollID={pollID}
      hideMarkTimesTable={hideMarkTimesTable}
      loggedInUsername={loggedInUsername}
      sortedTimes={sortedTimes}
    />
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
