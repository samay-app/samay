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
        <title>Kukkee — How-to</title>
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
        <Container className="how-to-container">
          <span className="how-to-features title">
            Kukkee — free and open source meeting poll tool
          </span>
          <span className="how-to-features desc">
            Free. Fast. Simple. No ads. No login.
          </span>
          <CardGroup className="how-to-card-group">
            <Card className="how-to-card">
              <Card.Body>
                <Card.Title className="how-to-card title">
                  1. Create a poll
                </Card.Title>
                <Card.Text className="how-to-card desc">
                  Quickly create a meeting poll by choosing the time slots based
                  on your availablity, and optionally enter the title,
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
                  since Kukkee automatically shows participants times in their
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
            <Button className="how-to-primary-btn">Create a poll</Button>
          </Link>
        </Container>
      </Layout>
    </>
  );
};

export default HowTo;
