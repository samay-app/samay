import { Container, Row, Col } from "react-bootstrap";
import Layout from "../../components/layout";
import Forms from "../../components/forms";

const Create = (): JSX.Element => {
  return (
    <Layout>
      <Container fluid>
        <Row>
          <Col>
            <h1>Create a poll</h1>
            <Forms />
          </Col>
        </Row>
      </Container>
    </Layout>
  );
};

export default Create;
