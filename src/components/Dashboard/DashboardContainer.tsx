import { Container } from "react-bootstrap";
import Greetings from "./Greetings";
import PollsList from "./PollsList";

const DashboardContainer = (): JSX.Element => {
  return (
    <Container className="outer-container" fluid>
      <Greetings />
      <PollsList />
    </Container>
  );
};

export default DashboardContainer;
