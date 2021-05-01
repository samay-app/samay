import { Container } from "react-bootstrap";
import Greetings from "./Greetings";
import PollsList from "./PollsList";

const DashboardContainer = (): JSX.Element => {
  return (
    <Container className="rm-container">
      <Greetings />
      <PollsList />
    </Container>
  );
};

export default DashboardContainer;
