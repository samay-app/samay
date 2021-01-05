import Greetings from "../src/components/greeting";
import { Container, Row, Col, Button } from "react-bootstrap";
import Layout from "../src/components/layout";
import withprivateAuth from "../src/utils/privateAuth"
import { useSelector } from "react-redux";

const Dashboard = (): JSX.Element => {

  const displayName = useSelector((state) => state.authReducer.displayName);

  return (
    <Layout>
      <Container className="outer-container" fluid>
        <h5> Welcome {displayName}</h5>
        <Greetings />
      </Container>
    </Layout>
  );
};
export default withprivateAuth(Dashboard);
