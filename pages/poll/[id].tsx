import { Container, Row, Col, Table } from "react-bootstrap";
import { useState } from "react";
import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
import Layout from "../../src/components/layout";
import PollInfo from "../../src/components/PollInfo";
import MarkChoices from "../../src/components/MarkChoices";
import MarkFinalChoice from "../../src/components/MarkFinalChoice";
import SubmitChoices from "../../src/components/SubmitChoices";
import SubmitFinalChoice from "../../src/components/SubmitFinalChoice";
import { Choice, RocketMeetPollFromDB, Vote } from "../../src/models/poll";
import isPollChoicePresent from "../../src/helpers/helpers";
import React, { useEffect } from 'react';
import { useSelector } from "react-redux";
import ShareInvite from "../../src/components/shareinvite";
import { GetServerSideProps } from 'next'

dayjs.extend(localizedFormat);


const Poll = ({ pollFromDB, pollid }): JSX.Element => {

  const currentLoggedInUserID = useSelector((state) => state.authReducer.username); // get stuff from store
  const isLoggedIn = useSelector((state) => state.authReducer.isLoggedIn);

  const sortedChoices: Choice[] = pollFromDB.choices.sort(
    (a, b) => a.start - b.start
  );

  const [newVote, setNewVote] = useState<Vote>({
    userID: "",
    choices: [],
  });

  const [finalChoice, setFinalChoice] = useState<Choice | undefined>();


  return (
    <Layout>
      <Container className="outer-container" fluid>
        <Row className="outer-container poll">
          <Col>
            <PollInfo poll={pollFromDB} />
            <Table bordered>
              <thead>
                <tr>
                  <th>
                    {pollFromDB.marked ? pollFromDB.marked.length : 0}{" "}
                    participants
                  </th>
                  {sortedChoices.map((choice) => (
                    <th
                      key={choice.start}
                      className={
                        choice.start === pollFromDB.finalChoice?.start &&
                          choice.end === pollFromDB.finalChoice?.end
                          ? "slot-final-chosen-cell"
                          : ""
                      }
                    >
                      {dayjs(choice.start).format("llll")} -{" "}
                      {dayjs(choice.end).format("LT")}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {pollFromDB.marked?.map((vote) => (
                  <tr key={vote.userID}>
                    <td>{vote.userID}</td>
                    {sortedChoices.map((choice) => (
                      <td
                        key={choice.start}
                        className={
                          isPollChoicePresent(choice, vote)
                            ? "slot-checked"
                            : "slot-unchecked"
                        }
                      >
                        {isPollChoicePresent(choice, vote) ? "✔" : ""}
                      </td>
                    ))}
                  </tr>
                ))}
                {pollFromDB.open &&
                  currentLoggedInUserID !== pollFromDB.userID && (
                    <MarkChoices
                      choices={sortedChoices}
                      newVote={newVote}
                      setNewVote={setNewVote}
                    />
                  )}
                {pollFromDB.open &&
                  currentLoggedInUserID === pollFromDB.userID && (
                    <MarkFinalChoice
                      choices={sortedChoices}
                      setFinalChoice={setFinalChoice}
                    />
                  )}
              </tbody>
            </Table>
            {pollFromDB.open && currentLoggedInUserID !== pollFromDB.userID && (
              <SubmitChoices newVote={newVote} pollid={pollid} />
            )}
            {pollFromDB.open && currentLoggedInUserID === pollFromDB.userID && (
              <SubmitFinalChoice finalChoice={finalChoice} pollid={pollid} />
            )}
          </Col>
        </Row>
        {pollFromDB.open &&
          currentLoggedInUserID === pollFromDB.userID && (
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
  const res = await fetch(`http://localhost:5000/v1/poll/${pollid}`)
  const status = res.status;
  const pollFromDB = await res.json()

  if (status == 404) {
    return {
      redirect: {
        destination: '/404',
        permanent: false,
      },
    }
  }
  return {
    props: { pollFromDB, pollid }, // will be passed to the page component as props
  }
}


export default Poll;
