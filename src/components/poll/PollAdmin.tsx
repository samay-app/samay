import React, { useState } from "react";
import Head from "next/head";
import { Col, Row, Container, Jumbotron } from "react-bootstrap";
import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
import Layout from "../Layout";
import PollInfo from "./PollInfo";
import PollTableAdmin from "./PollTableAdmin";
import DeletePoll from "./DeletePoll";
import SubmitFinalTime from "./SubmitFinalTime";
import ResponseMessage from "../ResponseMessage";
import CopyText from "../copyText";
import { Time, PollFromDB } from "../../models/poll";

dayjs.extend(localizedFormat);

const PollVoter = (props: {
  pollFromDB: PollFromDB;
  pollID: string;
  sortedTimes: Time[];
}): JSX.Element => {
  const { pollFromDB, pollID, sortedTimes } = props;

  const [finalTime, setFinalTime] = useState<Time | undefined>();

  const [response, setResponse] = useState({
    status: false,
    msg: "",
  });

  return (
    <>
      <Head>
        <title>Finalise time | Kukkee</title>
        <link rel="shortcut icon" href="/logo.svg" />
        <meta name="description" content="Kukkee" />
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
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
                    <CopyText
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
};

export default PollVoter;
