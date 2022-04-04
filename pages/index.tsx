import { Row, Col, Card, Container } from "react-bootstrap";
import { useSession, getSession } from "next-auth/react";
import Router from "next/router";
import { GetServerSideProps } from "next";
import Head from "next/head";
import Link from "next/link";
import { getPolls } from "../src/utils/api/server";
import { PollFromDB } from "../src/models/poll";
import Layout from "../src/components/Layout";

const Dashboard = (props: { polls: PollFromDB[] }): JSX.Element => {
  const { polls } = props;

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
        <link rel="shortcut icon" href="/logo.svg" />
        <meta name="description" content="Kukkee" />
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <Layout>
        <div className="kukkee-main-heading">
          <Container className="kukkee-container">Dashboard</Container>
        </div>
        <Container className="kukkee-container dashboard">
          <Row className="jumbo-row">
            <Col className="jumbo-col-black polls-dashboard-col">
              {polls.filter((poll) => poll.open).length > 0 && (
                <span className="dashboard-polls-heading">Open polls</span>
              )}
              {polls.filter((poll) => poll.open).length > 0 &&
                polls
                  .filter((poll) => poll.open)
                  .map((poll) => (
                    <a
                      className="poll-card-a"
                      href={`/poll/${poll._id}`}
                      key={poll._id}
                    >
                      <Card className="poll-card">
                        <Card.Body>
                          <Card.Title className="title">
                            {poll.title}
                          </Card.Title>
                          <Card.Text>{poll.description}</Card.Text>
                        </Card.Body>
                      </Card>
                    </a>
                  ))}
              {polls.filter((poll) => poll.open).length === 0 && (
                <span className="dashboard-polls-heading">
                  You don't have any open polls.{" "}
                  <Link href="/new">
                    <a>Create one now!</a>
                  </Link>
                </span>
              )}
            </Col>
          </Row>
        </Container>
      </Layout>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const {
    headers: { cookie },
  } = context.req;

  const session = await getSession(context);

  const getPollResponse = await getPolls(cookie);

  if (getPollResponse.statusCode === 401) {
    return {
      redirect: {
        destination: `/auth/signin`,
        permanent: false,
      },
    };
  }

  const polls = getPollResponse.data;

  return {
    props: { polls, session },
  };
};

export default Dashboard;
