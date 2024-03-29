import { Button, Container, CardGroup, Card } from "react-bootstrap";
import { CheckCircleFill, CircleFill } from "react-bootstrap-icons";
import React from "react";
import Head from "next/head";
import Link from "next/link";
import Layout from "../src/components/Layout";

const HowTo = (): JSX.Element => {
  return (
    <>
      <Head>
        <title>Samay — How-to</title>
        <link rel="shortcut icon" href="/favicon.svg" />
        <meta charSet="UTF-8" />
        <meta name="robots" content="noindex" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="title" content="Samay — Meeting poll tool" />
        <meta
          name="description"
          content="Here's how to get started with Samay - a free and open source meeting poll tool."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://samay.app" />
        <meta property="og:title" content="Samay — Meeting poll tool" />
        <meta
          property="og:description"
          content="Here's how to get started with Samay - a free and open source meeting poll tool."
        />
        <meta property="og:image" content="/banner.png" />
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://samay.app" />
        <meta property="twitter:title" content="Samay — Meeting poll tool" />
        <meta
          property="twitter:description"
          content="Here's how to get started with Samay - a free and open source meeting poll tool."
        />
        <meta property="twitter:image" content="/banner.png" />
      </Head>
      <Layout>
        <Container className="how-to-container">
          <span className="how-to-features title">
            Samay — free and open source meeting poll tool
          </span>
          <span className="how-to-features desc">
            Find a time which works for everyone without the
            back-and-forth texts/emails!
          </span>
          <CardGroup className="how-to-card-group">
            <Card className="how-to-card">
              <Card.Body>
                <Card.Title className="how-to-card title">
                  1. Create a poll
                </Card.Title>
                <Card.Text className="how-to-card desc">
                  Quickly create a meeting poll by choosing the time slots based
                  on your availability, and optionally enter the title,
                  description and location.
                </Card.Text>
              </Card.Body>
            </Card>
          </CardGroup>
          <CardGroup className="how-to-card-group">
            <Card className="how-to-card">
              <Card.Body>
                <Card.Title className="how-to-card title">
                  2. Share the poll
                </Card.Title>
                <Card.Text className="how-to-card desc">
                  Copy and share the poll link with the participants to let them
                  mark their availability using &nbsp;
                  <CheckCircleFill className="how-to-card icon-yes" /> (yes) or{" "}
                  <CircleFill className="how-to-card icon-if-need-be" /> (if
                  need be) votes. No login required. No time zone confusion
                  since Samay automatically shows participants times in their
                  local time zone.
                </Card.Text>
              </Card.Body>
            </Card>
          </CardGroup>
          <CardGroup className="how-to-card-group">
            <Card className="how-to-card">
              <Card.Body>
                <Card.Title className="how-to-card title">
                  3. Book the meeting
                </Card.Title>
                <Card.Text className="how-to-card desc">
                  Find the most popular times and see who's free with "yes"
                  votes - or who can be - with "if need be" votes, and book the
                  meeting!
                </Card.Text>
              </Card.Body>
            </Card>
          </CardGroup>
        </Container>
        <Container className="how-to-container cta">
          <Link href="/" passHref>
            <Button className="global-small-primary-btn">Create a poll</Button>
          </Link>
        </Container>
      </Layout>
    </>
  );
};

export default HowTo;
