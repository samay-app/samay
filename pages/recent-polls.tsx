import { Card, Container } from "react-bootstrap";
import Head from "next/head";
import Link from "next/link";
import { decrypt } from "../src/helpers";
import Layout from "../src/components/Layout";

const RecentPolls = (): JSX.Element => {
  let createdPolls = [];
  let votedPolls = [];

  if (typeof window !== "undefined") {
    const createdPollsFromLS = localStorage.getItem("kukkeeCreatedPolls");

    if (createdPollsFromLS) {
      const createdPollsFromLSJSON = JSON.parse(createdPollsFromLS);

      for (let i = 0; i < createdPollsFromLSJSON.polls.length; i += 1) {
        createdPolls.push(createdPollsFromLSJSON.polls[i]);
      }
    }

    let votedPollsFromLS = localStorage.getItem("kukkeeVotedPolls");

    if (votedPollsFromLS) {
      const votedPollsFromLSJSON = JSON.parse(votedPollsFromLS);

      for (let i = 0; i < votedPollsFromLSJSON.polls.length; i += 1) {
        votedPolls.push(votedPollsFromLSJSON.polls[i]);
      }
    }
  }

  const votedPollsClassName = `global-container ${
    createdPolls.length > 0 ? "mt-5" : ""
  }`;

  return (
    <>
      <Head>
        <title>Kukkee — Recent polls</title>
        <link rel="shortcut icon" href="/favicon.svg" />
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta
          name="google-site-verification"
          content="4g7sVHEgHkqmu_q066ocloQj3YI8pOz7IHC8ibisQHk"
        />
        <meta name="title" content="Kukkee — Meeting poll tool" />
        <meta
          name="description"
          content="Free and open source meeting poll tool"
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://kukkee.com" />
        <meta property="og:title" content="Kukkee — Meeting poll tool" />
        <meta
          property="og:description"
          content="Free and open source meeting poll tool"
        />
        <meta property="og:image" content="/banner.png" />
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://kukkee.com" />
        <meta property="twitter:title" content="Kukkee — Meeting poll tool" />
        <meta
          property="twitter:description"
          content="Free and open source meeting poll tool"
        />
        <meta property="twitter:image" content="/banner.png" />
      </Head>
      <Layout>
        <div className="global-page-section">
          {createdPolls.length > 0 && (
            <Container className="global-container">
              <span className="your-polls-polls-heading">Created polls</span>
              {createdPolls.map((poll) => (
                <Card
                  className="your-polls-poll-card"
                  key={Object.keys(poll)[0]}
                >
                  <Card.Body>
                    <Card.Title>
                      <a
                        className="stretched-link"
                        href={`/poll/${
                          Object.keys(poll)[0].split("-")[0]
                        }/${decrypt(poll[Object.keys(poll)[0]])}`}
                      >
                        {Object.keys(poll)[0].split("-")[1] || "Untitled"}
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
                <Card
                  className="your-polls-poll-card"
                  key={Object.keys(poll)[0]}
                >
                  <Card.Body>
                    <Card.Title>
                      <a
                        className="stretched-link"
                        href={`/poll/${Object.keys(poll)[0].split("-")[0]}`}
                      >
                        {poll[Object.keys(poll)[0]] || "Untitled"}
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
