import Link from "next/link";
import { Container, Row, Col } from "react-bootstrap";
import Layout from "../components/layout";

const Dashboard = (): JSX.Element => {
  return (
    <Layout>
      <Container fluid>
        <Row>
          <Col>
            <h1>Dashboard</h1>
            <h3>
              <Link href="/">
                <a>Landing page</a>
              </Link>
            </h3>
          </Col>
        </Row>
      </Container>
    </Layout>
  );
};
export default Dashboard;
