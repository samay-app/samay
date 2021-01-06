import { Container } from "react-bootstrap";
import { useSelector } from "react-redux";
import Greetings from "../src/components/greeting";
import Layout from "../src/components/layout";
import withprivateAuth from "../src/utils/privateAuth";

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
