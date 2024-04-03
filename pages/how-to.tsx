import { Button, Container, CardGroup, Card } from "react-bootstrap";
import { CheckCircleFill, CircleFill } from "react-bootstrap-icons";
import React from "react";
import Head from "next/head";
import Link from "next/link";
import Layout from "../src/components/Layout";

const HowTo = (): JSX.Element => {
  if (typeof window !== "undefined") {
    localStorage.setItem("samayNewVisitor", JSON.stringify(false));
  }

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
          content="Here's how to get started with Samay - a free and open source meeting poll tool."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://samay.app" />
        <meta
          property="og:title"
          content="Samay — find a time which works for everyone"
        />
        <meta
          property="og:description"
          content="Here's how to get started with Samay - a free and open source meeting poll tool."
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
          content="Here's how to get started with Samay - a free and open source meeting poll tool."
        />
        <meta property="twitter:image" content="https://samay.app/banner.png" />
      </Head>
      <Layout>
        <Container className="how-to-container">
          <span className="how-to-features title">
            Samay — free and open source meeting poll tool
          </span>
          <span className="how-to-features desc">
            Find a time which works for everyone without the back-and-forth
            texts/emails!
          </span>
          <CardGroup className="how-to-card-group">
            <Card className="how-to-card">
              <Card.Body>
                <Card.Title className="how-to-card title">
                  1. Create a poll
                </Card.Title>
                <Card.Text className="how-to-card desc">
                  Select the time slots (click and drag) based on your
                  availability, and optionally enter the title, description and
                  location.
                  <br />
                  <br />
                  The default poll type is "group" — to find a common time which
                  works for everyone. If you want to have one-on-one meetings
                  (parent-teacher meetings for example), select the "one-on-one"
                  poll type.
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
                  mark their availability.
                  <br />
                  <br />
                  In group polls, participants can either vote{" "}
                  <CheckCircleFill className="how-to-card icon-yes" /> [yes] by
                  clicking once or [if need be]{" "}
                  <CircleFill className="how-to-card icon-if-need-be" /> by
                  clicking twice. In one-on-one polls, participants can select
                  their one preferred time.
                  <br />
                  <br />
                  No login required. No time zone confusion since Samay
                  automatically shows participants times in their local time
                  zone.
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
                  In group polls, find the most popular times and see who's free
                  with [yes] votes - or who can be - with [if need be] votes,
                  book the meeting and share the final time with the
                  participants!
                  <br />
                  <br />
                  In one-on-one polls, find who has chosen which time slot for a
                  one-on-one with you!
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
