import { Card, Container } from "react-bootstrap";
import Head from "next/head";
import Link from "next/link";
import Layout from "../src/components/Layout";

const RecentPolls = (): JSX.Element => {
  let createdPolls = [];
  let votedPolls = [];

  if (typeof window !== "undefined") {
    for (let i = 0; i < localStorage.length; i += 1) {
      if (localStorage.getItem(localStorage.key(i)) === "creator") {
        createdPolls.push(localStorage.key(i));
      } else if (localStorage.getItem(localStorage.key(i)) === "voter") {
        votedPolls.push(localStorage.key(i));
      }
    }
  }

  const votedPollsClassName = `global-container ${
    createdPolls.length > 0 ? "mt-5" : ""
  }`;

  return (
    <>
      <Head>
        <title>Kukkee | Recent polls</title>
        <link rel="shortcut icon" href="/favicon.svg" />
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta
          name="google-site-verification"
          content="4g7sVHEgHkqmu_q066ocloQj3YI8pOz7IHC8ibisQHk"
        />
        <meta name="title" content="Kukkee | Meeting poll tool" />
        <meta
          name="description"
          content="Free and open source meeting poll tool. Bring people together, at the right time!"
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://kukkee.com" />
        <meta property="og:title" content="Kukkee | Meeting poll tool" />
        <meta
          property="og:description"
          content="Free and open source meeting poll tool. Bring people together, at the right time!"
        />
        <meta property="og:image" content="/banner.png" />
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://kukkee.com" />
        <meta property="twitter:title" content="Kukkee | Meeting poll tool" />
        <meta
          property="twitter:description"
          content="Free and open source meeting poll tool. Bring people together, at the right time!"
        />
        <meta property="twitter:image" content="/banner.png" />
      </Head>
      <Layout>
        <div className="global-page-section">
          {createdPolls.length > 0 && (
            <Container className="global-container">
              <span className="your-polls-polls-heading">Created polls</span>
              {createdPolls.map((poll) => (
                <Card className="your-polls-poll-card" key={poll}>
                  <Card.Body>
                    <Card.Title>
                      <a
                        className="stretched-link"
                        href={`/poll/${poll.split("-")[0]}`}
                      >
                        {poll.split("-")[1] || "Untitled"}
                      </a>
                    </Card.Title>
                  </Card.Body>
                </Card>
              ))}
            </Container>
          )}
          {votedPolls.length > 0 && (
            <Container className={votedPollsClassName}>
              <span className="your-polls-polls-heading">Voted polls</span>
              {votedPolls.map((poll) => (
                <Card className="your-polls-poll-card" key={poll}>
                  <Card.Body>
                    <Card.Title>
                      <a
                        className="stretched-link"
                        href={`/poll/${poll.split("-")[0]}`}
                      >
                        {poll.split("-")[1] || "Untitled"}
                      </a>
                    </Card.Title>
                  </Card.Body>
                </Card>
              ))}
            </Container>
          )}
          {createdPolls.length === 0 && votedPolls.length === 0 && (
            <Container className="global-container">
              <span className="your-polls-polls-heading">
                Looks like you don't have any polls. <br />
                <Link href="/">
                  <a>Create one now</a>
                </Link>
                !
              </span>
            </Container>
          )}
        </div>
      </Layout>
    </>
  );
};

export default RecentPolls;
