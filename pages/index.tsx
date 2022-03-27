import { Row, Col, Container, Jumbotron } from "react-bootstrap";
import { useSession } from "next-auth/react";
import Router from "next/router";
import Head from "next/head";
import Layout from "../src/components/Layout";

const Dashboard = (): JSX.Element => {
  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      Router.push("auth/signin");
    },
  });

  if (!session) return <></>;

  return (
    <>
      <Head>
        <title>Dashboard | Kukkee</title>
        <link rel="shortcut icon" href="/Kukkee-favicon.svg" />
        <meta name="description" content="Kukkee" />
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <Layout>
        <div className="kukkee-main-heading">
          <Container className="kukkee-container">Dashboard</Container>
        </div>
        <Container className="kukkee-container">
          <Row className="jumbo-row">
            <Col className="jumbo-col-black">
              <Jumbotron className="kukkee-jumbo">fgfgfg</Jumbotron>
            </Col>
          </Row>
        </Container>
      </Layout>
    </>
  );
};

export default Dashboard;
