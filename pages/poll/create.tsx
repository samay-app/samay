import Link from "next/link";
import { Container, Row, Col, Button } from "react-bootstrap";
import { useState } from "react";
import Layout from "../../components/layout";
import TimeSlot from "../../components/timeslot";
import TimeRangeDropdown from "../../components/timerangedropdown";

const Create = (): JSX.Element => {
  let timeSlotArray: number[] = [];
  const [timeVal, setTimeVal] = useState({ timeFactor: 1, option: false });

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
            <h3>
              <Link href="/">
                <a>Landing page</a>
              </Link>
              <TimeRangeDropdown
                onDropNSelect={(value: number): void =>
                  setTimeVal({ timeFactor: value, option: true })
                }
              />
              {timeVal.option && (
                <TimeSlot
                  timeFactor={timeVal.timeFactor}
                  timeSlotArray={timeSlotArray}
                />
              )}
              {timeVal.option && (
                <Button variant="primary" type="submit" onClick={handleSubmit}>
                  Continue
                </Button>
              )}
            </h3>
          </Col>
        </Row>
      </Container>
    </Layout>
  );
};

export default Create;
