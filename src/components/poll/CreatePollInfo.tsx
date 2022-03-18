import { useState, useEffect } from "react";
import { Form, Row } from "react-bootstrap";

const CreatePollInfo = (props: {
  onMount: (data: string[]) => void;
}): JSX.Element => {
  const { onMount } = props;

  const [pollTitle, setTitle] = useState<string>("");
  const [pollLocation, setLocation] = useState<string>("");
  const [pollDescription, setDescription] = useState<string>("");

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { value } = e.target;
    setTitle(value);
  };

  const handleLocationChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const { value } = e.target;
    setLocation(value);
  };

  const handleDescriptionChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const { value } = e.target;
    setDescription(value);
  };

  useEffect(() => {
    onMount([pollTitle, pollLocation, pollDescription]);
  }, [onMount, pollTitle, pollLocation, pollDescription]);

  return (
    <>
      <Form.Group as={Row} controlId="formPlainTextTitle">
        <Form.Control
          className="kukkee-form-text"
          type="text"
          placeholder="Title"
          required
          onChange={handleTitleChange}
        />
      </Form.Group>
      <Form.Group as={Row} controlId="formPlainTextDescription">
        <Form.Control
          className="kukkee-form-text"
          type="text"
          placeholder="Description (optional)"
          onChange={handleDescriptionChange}
        />
      </Form.Group>
      <Form.Group as={Row} controlId="formPlainTextLocation">
        <Form.Control
          className="kukkee-form-text"
          type="text"
          placeholder="Location (optional)"
          onChange={handleLocationChange}
        />
      </Form.Group>
    </>
  );
};

export default CreatePollInfo;
