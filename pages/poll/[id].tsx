import React, { useState } from "react";
import { GetServerSideProps } from "next";
import { Row, Container, Jumbotron, Alert } from "react-bootstrap";
import { useSelector } from "react-redux";
import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
import { serverAPI } from "../../src/api/server";
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
import ShareInvite from "../../src/components/shareinvite";
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
  const [showPopS, setShowPopS] = useState<boolean>(false);
  const [showPopF, setShowPopF] = useState<boolean>(false);

  const handleChangeS = (newValS: boolean): void => {
    setShowPopS(newValS);
  };
  const handleChangeF = (newValF: boolean): void => {
    setShowPopF(newValF);
  };

  return (
    <Layout>
      <Container className="rm-poll-container" fluid>
        <Row className="jumbo-row">
          <div className="jumbo-col-black col-sm-4">
            <Jumbotron className="poll-info">
              <PollInfo poll={pollFromDB} />
              {pollFromDB.open &&
                loggedInUserEmailID === pollCreatorEmailID && (
                  <ShareInvite
                    polltitle={pollFromDB.title}
                    pollid={pollid}
                    onChangeS={handleChangeS}
                    onChangeF={handleChangeF}
                  />
                )}
            </Jumbotron>
          </div>
          <div className="col-sm-8">
            <Jumbotron className="poll-table-jumbo">
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
            </Jumbotron>
          </div>
        </Row>
        <div className="alert-corner">
          <Alert
            variant="success"
            show={showPopS}
            onClose={(): void => setShowPopS(false)}
            dismissible
          >
            <Alert.Heading>Successfully sent mails</Alert.Heading>
          </Alert>
          <Alert
            variant="danger"
            show={showPopF}
            onClose={(): void => setShowPopF(false)}
            dismissible
          >
            <Alert.Heading>Mails not sent</Alert.Heading>
          </Alert>
        </div>
      </Container>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  let pollid = null;
  if (context.params) {
    pollid = context.params.id;
  }
  const getPollResponse = await serverAPI.getPoll(pollid);
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
    props: { pollFromDB, pollid }, // will be passed to the page component as props
  };
};

export default Poll;
