import Head from "next/head";
import Link from "next/link";
import Router from "next/router";
import { useState } from "react";
import { Button, Card, Container } from "react-bootstrap";
import { Grid, Trash } from "react-bootstrap-icons";
import Modal from "react-bootstrap/Modal";
import Layout from "../src/components/Layout";
import DeletePoll from "../src/components/poll/DeletePoll";
import { decrypt } from "../src/helpers";

const RemoveVotedPollModal = (props: {
  show;
  onHide;
  deleteVotedPoll;
  poll;
}): JSX.Element => {
  const { deleteVotedPoll, poll } = props;

  return (
    <Modal
      {...props}
      dialogClassName="modal-60w"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Remove poll
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Are you sure you want to remove this poll?</p>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={() => deleteVotedPoll(Object.keys(poll)[0])}>
          Remove
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

const RecentPolls = (): JSX.Element => {
  let createdPolls = [];
  let votedPolls = [];

  let pageSection = <></>;

  const [modalShow, setModalShow] = useState(false);

  const deleteVotedPoll = (pollID) => {
    if (typeof window !== "undefined") {
      const allVotedPolls = localStorage.getItem("samayVotedPolls");

      if (allVotedPolls) {
        const samayVotedPollsJSON = JSON.parse(allVotedPolls);

        let newSamayVotedPolls = {
          polls: samayVotedPollsJSON.polls.filter(
            (poll) => Object.keys(poll)[0] !== `${pollID}`
          ),
        };

        localStorage.setItem(
          "samayVotedPolls",
          JSON.stringify(newSamayVotedPolls)
        );

        Router.reload();
      }
    }
  };

  if (typeof window !== "undefined") {
    const createdPollsFromLS = localStorage.getItem("samayCreatedPolls");

    if (createdPollsFromLS) {
      const createdPollsFromLSJSON = JSON.parse(createdPollsFromLS);

      for (let i = 0; i < createdPollsFromLSJSON.polls.length; i += 1) {
        createdPolls.push(createdPollsFromLSJSON.polls[i]);
      }
    }

    let votedPollsFromLS = localStorage.getItem("samayVotedPolls");

    if (votedPollsFromLS) {
      const votedPollsFromLSJSON = JSON.parse(votedPollsFromLS);

      for (let i = 0; i < votedPollsFromLSJSON.polls.length; i += 1) {
        votedPolls.push(votedPollsFromLSJSON.polls[i]);
      }
    }

    const votedPollsClassName = `poll-container ${
      createdPolls.length > 0 ? "mt-5" : ""
    }`;

    if (createdPolls.length || votedPolls.length) {
      pageSection = (
        <div className="global-page-section">
          {createdPolls.length > 0 && (
            <Container className="poll-container">
              <span className="your-polls-polls-heading">Created polls</span>
              {createdPolls.toReversed().map((poll) => (
                <a
                  key={Object.keys(poll)[0]}
                  href={`/poll/${Object.keys(poll)[0].split("-")[0]}/${decrypt(
                    poll[Object.keys(poll)[0]]
                  )}`}
                >
                  <Card className="your-polls-poll-card">
                    <Card.Body>
                      <Card.Title>
                        {Object.keys(poll)[0].split("-").slice(1).join("-") ||
                          "Untitled"}
                        <div className="card-options">
                          <DeletePoll
                            pollID={Object.keys(poll)[0].split("-")[0]}
                            pollTitle={
                              Object.keys(poll)[0]
                                .split("-")
                                .slice(1)
                                .join("-") || ""
                            }
                            secret={decrypt(poll[Object.keys(poll)[0]])}
                          />
                        </div>
                      </Card.Title>
                    </Card.Body>
                  </Card>
                </a>
              ))}
            </Container>
          )}
          {votedPolls.length > 0 && (
            <Container className={votedPollsClassName}>
              <span className="your-polls-polls-heading">Voted polls</span>
              {votedPolls.toReversed().map((poll) => (
                <a
                  key={Object.keys(poll)[0]}
                  href={`/poll/${Object.keys(poll)[0]}`}
                >
                  <Card className="your-polls-poll-card">
                    <Card.Body>
                      <Card.Title>
                        {(Object.values(poll)[0] as string).includes("#{") &&
                          ((Object.values(poll)[0] as string).split("#{")[0] ||
                            "Untitled")}
                        {!(Object.values(poll)[0] as string).includes("#{") &&
                          (Object.values(poll)[0] || "Untitled")}
                        <div className="card-options">
                          <Button
                            className="trash-button"
                            onClick={(e) => {
                              e.stopPropagation;
                              e.preventDefault();
                              setModalShow(true);
                            }}
                          >
                            <Trash className="icon" />
                          </Button>
                          <RemoveVotedPollModal
                            show={modalShow}
                            onHide={() => setModalShow(false)}
                            deleteVotedPoll={deleteVotedPoll}
                            poll={poll}
                          />
                        </div>
                      </Card.Title>
                    </Card.Body>
                  </Card>
                </a>
              ))}
            </Container>
          )}
        </div>
      );
    } else {
      pageSection = (
        <div className="global-page-section">
          <Container className="no-poll-container">
            <Grid className="icon" />
            <span className="first-line">No recent polls</span>
            <span className="second-line">
              Looks like you haven't created or voted on any polls
            </span>
            <Link href="/" passHref>
              <Button className="global-small-primary-btn">
                Create a poll
              </Button>
            </Link>
          </Container>
        </div>
      );
    }
  }

  return (
    <>
      <Head>
        <title>Samay — recent polls</title>
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
          content="Manage your recently created or voted polls on Samay - a free and open source group scheduling tool."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://samay.app" />
        <meta
          property="og:title"
          content="Samay — find a time which works for everyone"
        />
        <meta
          property="og:description"
          content="Manage your recently created or voted polls on Samay - a free and open source group scheduling tool."
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
          content="Manage your recently created or voted polls on Samay - a free and open source group scheduling tool."
        />
        <meta property="twitter:image" content="https://samay.app/banner.png" />
      </Head>
      <Layout>{pageSection}</Layout>
    </>
  );
};

export default RecentPolls;
