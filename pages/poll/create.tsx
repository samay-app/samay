import dynamic from "next/dynamic";
import { Container, Row, Col, Button } from "react-bootstrap";
// import { useState } from "react";
import Layout from "../../components/layout";
import Forms from "../../components/forms";

// typings aren't available for react-available-times :(

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const AvailableTimes: any = dynamic(() => import("react-available-times"), {
  ssr: false,
});

const Create = (): JSX.Element => {
  // let timeSlotArray: number[] = [];

  function handleSubmit(): void {
    // handling the data for the backend here
    //
    // const data = {
    //   name: ,
    //   description: ,
    //   open: true,
    //   userID: ,
    //   interval: timeVal.timeFactor,
    //   choices: timeSlotArray,
    //   finalChoice: ,
    //   marked: [],
    // }
  }

  return (
    <Layout>
      <Container fluid>
        <Row>
          <Col>
            <h1>Create a poll</h1>

            <Forms />
            <AvailableTimes
              weekStartsOn="monday"
              onChange={(selections: { start: Date; end: Date }[]): void => {
                selections.forEach(({ start, end }) => {
                  console.log("Start:", start, "End:", end);
                });
              }}
              height={500}
            />
            <Button variant="primary" type="submit" onClick={handleSubmit}>
              Create Poll
            </Button>
          </Col>
        </Row>
      </Container>
    </Layout>
  );
};

export default Create;
