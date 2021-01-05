import Greetings from "../src/components/greeting";
import { Container, Row, Col, Button } from "react-bootstrap";
import Layout from "../src/components/layout";
import withprivateAuth from "../src/utils/privateAuth"
import { useSelector } from "react-redux";

const Dashboard = (): JSX.Element => {

  const displayName = useSelector((state) => state.authReducer.displayName);

  return (
    <Layout>
      <Container fluid>
        <Row>
          <Col>
            <h1>Dashboard</h1>
            <h3> Welcome {displayName},</h3>
          </Col>
        </Row>
        <Row>
          <Greetings />
        </Row>
      </Container>
    </Layout>
  );
};
export default withprivateAuth(Dashboard);
