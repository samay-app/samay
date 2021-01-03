import dynamic from "next/dynamic";
import { Container, Form, Row, Col, Button } from "react-bootstrap";
import { useState } from "react";
import Layout from "../../components/layout";
import { Choice, RocketMeetPoll } from "../../models/poll";

// typings aren't available for react-available-times :(

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const AvailableTimes: any = dynamic(() => import("react-available-times"), {
  ssr: false,
});

const currentLoggedInUserID = "haha"; // get the correct user

const Create = (): JSX.Element => {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [choices, setChoices] = useState<Choice[]>();

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { value } = e.target;
    setTitle(value);
  };

  const handleDescriptionChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const { value } = e.target;
    setDescription(value);
  };

  const onChoicesChange = (selections: { start: Date; end: Date }[]): void => {
    const newChoices: Choice[] = selections.map(
      (choice): Choice => ({
        start: choice.start.getTime(),
        end: choice.end.getTime(),
      })
    );
    setChoices(newChoices);
  };

  const handleSubmit = (): void => {
    if (title && choices && choices?.length > 0) {
      const poll: RocketMeetPoll = {
        title,
        description,
        open: true,
        userID: currentLoggedInUserID,
        choices,
      };

      // POST poll at v1/user/poll
    }
  };

  return (
    <Layout>
      <Container fluid>
        <Row>
          <Col>
            <h1>Create a poll</h1>
            <Form className="p-3">
              <Form.Group as={Row} controlId="formPlainTextTitle">
                <Form.Label column sm="2">
                  Title
                </Form.Label>
                <Col sm="10">
                  <Form.Control
                    type="text"
                    placeholder="Enter the title"
                    required
                    onChange={handleTitleChange}
                  />
                </Col>
              </Form.Group>
              <Form.Group as={Row} controlId="formPlainTextDescription">
                <Form.Label column sm="2">
                  Description
                </Form.Label>
                <Col sm="10">
                  <Form.Control
                    type="text"
                    placeholder="Enter the description"
                    onChange={handleDescriptionChange}
                  />
                </Col>
              </Form.Group>
            </Form>
            <AvailableTimes
              weekStartsOn="monday"
              onChange={onChoicesChange}
              height={500}
            />
            <Button
              variant="primary"
              type="submit"
              onClick={handleSubmit}
              disabled={!title || !choices || choices?.length === 0}
            >
              Create Poll
            </Button>
          </Col>
        </Row>
      </Container>
    </Layout>
  );
};

export default Create;
