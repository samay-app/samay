import { Container } from "react-bootstrap";
import Greetings from "../src/components/Greetings";
import Layout from "../src/components/Layout";
import withprivateAuth from "../src/utils/privateAuth";
import PollsList from "../src/components/pollsList";

const Dashboard = (): JSX.Element => {
  return (
    <Layout>
      <div className="dash-container">
        <Greetings />
      </div>
      <div className="dash-container yp">
        <PollsList />
      </div>
    </Layout>
  );
};

export default withprivateAuth(Dashboard);
