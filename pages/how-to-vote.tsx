import Head from "next/head";
import { useRouter } from "next/router";
import { Card, CardGroup, Container } from "react-bootstrap";
import { CheckCircleFill, CircleFill } from "react-bootstrap-icons";
import Layout from "../src/components/Layout";

const HowTo = (): JSX.Element => {
  if (typeof window !== "undefined") {
    localStorage.setItem("samayNewVisitor", JSON.stringify(false));
  }

  const router = useRouter();

  return (
    <>
      <Head>
        <title>Samay — how-to</title>
        <link rel="shortcut icon" href="/favicon.svg" />
        <meta charSet="UTF-8" />
        <meta name="robots" content="noindex" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta
          name="title"
          content="Samay — find a time which works for everyone"
        />
        <meta
          name="description"
          content="Here's how to get started with Samay - a free and open source group scheduling tool."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://samay.app" />
        <meta
          property="og:title"
          content="Samay — find a time which works for everyone"
        />
        <meta
          property="og:description"
          content="Here's how to get started with Samay - a free and open source group scheduling tool."
        />
        <meta property="og:image" content="https://samay.app/banner.png" />
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://samay.app" />
        <meta
          property="twitter:title"
          content="Samay — find a time which works for everyone"
        />
        <meta
          property="twitter:description"
          content="Here's how to get started with Samay - a free and open source group scheduling tool."
        />
        <meta property="twitter:image" content="https://samay.app/banner.png" />
      </Head>
      <Layout>
        <Container className="how-to-container">
          <span className="how-to-features title">
            Samay — free and open source group scheduling tool
          </span>
          <span className="how-to-features desc">
            Find a time which works for everyone without the back-and-forth
            texts/emails!
          </span>
          <CardGroup className="how-to-card-group">
            <Card className="how-to-card">
              <Card.Body>
                <Card.Title className="how-to-card title">
                  How to vote
                </Card.Title>
                <Card.Text className="how-to-card desc">
                  In group polls, select all time slots you're available at. You
                  can vote "yes" [
                  <CheckCircleFill className="how-to-card icon-yes" />] by
                  clicking a slot once or "if need be" [
                  <CircleFill className="how-to-card icon-if-need-be" />] by
                  clicking twice. Clicking again would remove the vote.
                  <br />
                  <br />
                  In one-on-one polls, you can select your one preferred time.
                  <br />
                  <br />
                  No login required.
                </Card.Text>
              </Card.Body>
            </Card>
          </CardGroup>
        </Container>
      </Layout>
    </>
  );
};

export default HowTo;
