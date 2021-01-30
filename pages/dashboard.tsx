import { Container } from "react-bootstrap";
import Greetings from "../src/components/Greetings";
import Layout from "../src/components/Layout";
import withprivateAuth from "../src/utils/privateAuth";
import PollsList from "../src/components/PollsList";

const Dashboard = (): JSX.Element => {
  return (
    <Layout>
      <Container className="outer-container" fluid>
        <Greetings />
        <PollsList />
      </Container>
    </Layout>
  );
};

export default withprivateAuth(Dashboard);
