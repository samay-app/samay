import React, { useState } from "react";
import { GetServerSideProps } from "next";
import { Row, Container, Jumbotron } from "react-bootstrap";
import { ChevronDown } from "react-bootstrap-icons";
import { useSelector } from "react-redux";
import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
import { getPoll } from "../../src/utils/api/server";
import Layout from "../../src/components/Layout";
import PollInfo from "../../src/components/poll/PollInfo";
import PollTable from "../../src/components/poll/PollTable";
import {
  Choice,
  ChoiceFromDB,
  Vote,
  RocketMeetPollFromDB,
} from "../../src/models/poll";
import { decrypt } from "../../src/helpers/helpers";
import ShareInvite from "../../src/components/shareinvite/ShareInvite";
import { RootState } from "../../src/store/store";

dayjs.extend(localizedFormat);

const Poll = (props: {
  pollFromDB: RocketMeetPollFromDB;
  pollID: string;
}): JSX.Element => {
  const { pollFromDB, pollID } = props;
  const pollCreatorEmailID = decrypt(pollFromDB.encryptedEmailID);
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
      <Container className="rm-poll-container" fluid>
        <Row className="jumbo-row">
          <div className="jumbo-col-black col-sm-4">
            <Jumbotron className="poll-info">
              <PollInfo poll={pollFromDB} />
              {loggedInUserEmailID === pollCreatorEmailID && (
                <>
                  <ShareInvite
                    pollTitle={pollFromDB.title}
                    pollID={pollID}
                    finalChoice={pollFromDB.finalChoice}
                  />
                  <div className="rm-chevron-down-div">
                    <ChevronDown className="rm-chevron-down" />
                  </div>
                </>
              )}
            </Jumbotron>
          </div>
          <div className="col-sm-8">
            <Jumbotron className="poll-table-jumbo">
              <PollTable
                pollFromDB={pollFromDB}
                pollID={pollID}
                sortedChoices={sortedChoices}
                newVote={newVote}
                setNewVote={setNewVote}
                finalChoice={finalChoice}
                setFinalChoice={setFinalChoice}
                pollCreatorEmailID={pollCreatorEmailID}
                loggedInUserEmailID={loggedInUserEmailID}
              />
            </Jumbotron>
          </div>
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
