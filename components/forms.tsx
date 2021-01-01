import { Form, Row, Col } from "react-bootstrap";

const Forms = (): JSX.Element => {
  return (
    <Form className="p-3">
      <Form.Group as={Row} controlId="formPlaintextTitle">
        <Form.Label column sm="2">
          Title
        </Form.Label>
        <Col sm="10">
          <Form.Control type="text" placeholder="Give a title" required />
        </Col>
      </Form.Group>
      <Form.Group as={Row} controlId="formPlaintextdescription">
        <Form.Label column sm="2">
          Description
        </Form.Label>
        <Col sm="10">
          <Form.Control type="text" placeholder="Give a small description" />
        </Col>
      </Form.Group>
      <Form.Group as={Row} controlId="formPlaintextName">
        <Form.Label column sm="2">
          Name
        </Form.Label>
        <Col sm="10">
          <Form.Control type="text" placeholder="Your name" required />
        </Col>
      </Form.Group>
      <Form.Group as={Row} controlId="formPlaintextMail">
        <Form.Label column sm="2">
          Email
        </Form.Label>
        <Col sm="10">
          <Form.Control type="email" placeholder="Your mail id" required />
        </Col>
      </Form.Group>
    </Form>
  );
};

export default Forms;
