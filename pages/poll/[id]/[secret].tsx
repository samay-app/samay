import React, { useState } from "react";
import { GetServerSideProps } from "next";
import { Col, Row, Container, Jumbotron } from "react-bootstrap";
import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
import { getPoll } from "../../../src/utils/api/server";
import Layout from "../../../src/components/Layout";
import PollInfo from "../../../src/components/poll/PollInfo";
import PollTableAdmin from "../../../src/components/poll/PollTableAdmin";
import SubmitFinalChoice from "../../../src/components/poll/SubmitFinalChoice";
import { Choice, ChoiceFromDB, PollFromDB } from "../../../src/models/poll";
import ShareInvite from "../../../src/components/shareInvite/ShareInvite";

dayjs.extend(localizedFormat);

const Poll = (props: {
  pollFromDB: PollFromDB;
  pollID: string;
  secret: string;
}): JSX.Element => {
  const { pollFromDB, pollID, secret } = props;
  const sortedChoices: ChoiceFromDB[] = pollFromDB.choices.sort(
    (a: ChoiceFromDB, b: ChoiceFromDB) => a.start - b.start
  );
  const [finalChoice, setFinalChoice] = useState<Choice | undefined>();

  return (
    <Layout>
      <Container className="rm-container">
        <Row className="jumbo-row">
          <Col className="jumbo-col-black">
            <Jumbotron className="poll-info">
              <Row>
                <Col sm>
                  <PollInfo poll={pollFromDB} />
                </Col>
                <Col sm className="poll-shareinvite-col">
                  <ShareInvite
                    pollTitle={pollFromDB.title}
                    pollID={pollID}
                    finalChoice={pollFromDB.finalChoice}
                  />
                </Col>
              </Row>
            </Jumbotron>
          </Col>
        </Row>
        <Row className="jumbo-row">
          <Col className="jumbo-col">
            <Jumbotron className="poll-table-jumbo">
              <PollTableAdmin
                pollFromDB={pollFromDB}
                sortedChoices={sortedChoices}
                setFinalChoice={setFinalChoice}
              />
            </Jumbotron>
            {pollFromDB.open && (
              <SubmitFinalChoice
                finalChoice={finalChoice}
                pollID={pollID}
                secret={secret}
              />
            )}
          </Col>
        </Row>
      </Container>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  let pollID = null;
  let secret = null;
  if (context.params) {
    pollID = context.params.id;
    secret = context.params.secret;
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

  if (secret !== pollFromDB.secret) {
    return {
      redirect: {
        destination: `/poll/${pollID}`,
        permanent: false,
      },
    };
  }

  return {
    props: { pollFromDB, pollID, secret }, // will be passed to the page component as props
  };
};

export default Poll;
