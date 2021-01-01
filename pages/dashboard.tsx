import { Container, Row, Col } from "react-bootstrap";
import Greetings from "../components/greeting";
import Layout from "../components/layout";

const Dashboard = (): JSX.Element => {
  return (
    <Layout>
      <Container fluid>
        <Row>
          <Col>
            <h1>Dashboard</h1>
          </Col>
        </Row>
        <Row>
          <Greetings />
        </Row>
      </Container>
    </Layout>
  );
};
export default Dashboard;
