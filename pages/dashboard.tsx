import Greetings from "../src/components/greeting";
import { Container, Row, Col, Button } from "react-bootstrap";
import Layout from "../src/components/layout";


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
