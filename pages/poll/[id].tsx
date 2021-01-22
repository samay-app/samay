import React, { useState } from "react";
import { GetServerSideProps } from "next";
import { Container, Row, Col } from "react-bootstrap";
import { useSelector } from "react-redux";
import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
import Layout from "../../src/components/Layout";
import PollInfo from "../../src/components/PollInfo";
import PollTable from "../../src/components/PollTable";
import {
  Choice,
  ChoiceFromDB,
  Vote,
  RocketMeetPollFromDB,
} from "../../src/models/poll";
import { decrypt } from "../../src/helpers/helpers";
import ShareInvite from "../../src/components/ShareInvite";
import { RootState } from "../../src/store/store";

dayjs.extend(localizedFormat);

const Poll = (props: {
  pollFromDB: RocketMeetPollFromDB;
  pollid: string;
}): JSX.Element => {
  const { pollFromDB, pollid } = props;
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
      <Container className="outer-container" fluid>
        <Row className="inner-container">
          <Col>
            <PollInfo poll={pollFromDB} />
            <PollTable
              pollFromDB={pollFromDB}
              pollid={pollid}
              sortedChoices={sortedChoices}
              newVote={newVote}
              setNewVote={setNewVote}
              finalChoice={finalChoice}
              setFinalChoice={setFinalChoice}
              pollCreatorEmailID={pollCreatorEmailID}
              loggedInUserEmailID={loggedInUserEmailID}
            />
          </Col>
        </Row>
        {pollFromDB.open && loggedInUserEmailID === pollCreatorEmailID && (
          <Row className="outer-container share justify-content-center">
            <ShareInvite pollid={pollid} />
          </Row>
        )}
      </Container>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const pollid = context.params.id;
  const res = await fetch(`http://localhost:5000/v1/poll/${pollid}`);
  const { status } = res;
  const pollFromDB = await res.json();

  if (status === 404) {
    return {
      redirect: {
        destination: "/404",
        permanent: false,
      },
    };
  }
  return {
    props: { pollFromDB, pollid }, // will be passed to the page component as props
  };
};

export default Poll;
