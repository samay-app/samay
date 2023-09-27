import Router from "next/router";
import Head from "next/head";
import {
  Row,
  Col,
  Form,
  Container,
  Jumbotron,
  Button,
  Spinner,
} from "react-bootstrap";
import { nanoid } from "nanoid";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import toastOptions from "../src/helpers/toastOptions";
import Layout from "../src/components/Layout";
import { encrypt } from "../src/helpers";
import { Time, Poll } from "../src/models/poll";
import KukkeeRBC from "../src/components/KukkeeRBC";
import { createPoll } from "../src/utils/api/server";

const Home = (): JSX.Element => {
  const [pollDetails, setPollDetails] = useState<{
    pollTitle: string;
    pollLocation: string;
    pollDescription: string;
  }>({
    pollTitle: "",
    pollLocation: "",
    pollDescription: "",
  });

  const { pollTitle, pollLocation, pollDescription } = pollDetails;

  const [pollTimes, setTimes] = useState<Time[]>([]);
  const [disabled, setDisabled] = useState<boolean>(false);

  const handlePollDetailsChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const { name, value } = e.target;

    setPollDetails({
      ...pollDetails,
      [name]: value,
    });
  };

  const handleSubmit = async (
    e: React.MouseEvent<HTMLInputElement>
  ): Promise<void> => {
    e.preventDefault();

    if (!pollTimes || (pollTimes && pollTimes?.length < 2)) {
      toast.error("Please select at least two time slots", toastOptions);
      return;
    }

    const secret = nanoid(10);
    const encryptedSecret = encrypt(secret);

    const poll: Poll = {
      title: pollTitle,
      description: pollDescription,
      location: pollLocation,
      secret: encryptedSecret,
      times: pollTimes,
    };

    try {
      setDisabled(true);

      const createPollResponse = await createPoll({
        poll,
      });

      if (createPollResponse.statusCode === 201) {
        if (typeof window !== "undefined") {
          const kukkeeCreatedPolls = localStorage.getItem("kukkeeCreatedPolls");

          if (!kukkeeCreatedPolls) {
            const initKukkeeCreatedPolls = {
              polls: [
                {
                  [`${createPollResponse.data._id}-${pollTitle}`]: `${encryptedSecret}`,
                },
              ],
            };

            localStorage.setItem(
              "kukkeeCreatedPolls",
              JSON.stringify(initKukkeeCreatedPolls)
            );
          } else {
            let kukkeeCreatedPollsJSON = JSON.parse(kukkeeCreatedPolls);

            kukkeeCreatedPollsJSON.polls.push({
              [`${createPollResponse.data._id}-${pollTitle}`]: `${encryptedSecret}`,
            });

            localStorage.setItem(
              "kukkeeCreatedPolls",
              JSON.stringify(kukkeeCreatedPollsJSON)
            );
          }
        }
        Router.push(`/poll/${createPollResponse.data._id}/${secret}`);
      } else {
        setDisabled(false);
        toast.error(
          "Poll creation failed, please try again later",
          toastOptions
        );
      }
    } catch (err) {
      setDisabled(false);
      toast.error("Poll creation failed, please try again later", toastOptions);
    }
  };

  return (
    <>
      <Head>
        <title>Kukkee — Meeting poll tool</title>
        <link rel="shortcut icon" href="/favicon.svg" />
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="title" content="Kukkee — Meeting poll tool" />
        <meta
          name="description"
          content="Free and open source meeting poll tool. Quickly find a time which works for everyone without the back-and-forth texts/emails!"
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://kukkee.com" />
        <meta property="og:title" content="Kukkee — Meeting poll tool" />
        <meta
          property="og:description"
          content="Free and open source meeting poll tool. Quickly find a time which works for everyone without the back-and-forth texts/emails!"
        />
        <meta property="og:image" content="/banner.png" />
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://kukkee.com" />
        <meta property="twitter:title" content="Kukkee — Meeting poll tool" />
        <meta
          property="twitter:description"
          content="Free and open source meeting poll tool. Quickly find a time which works for everyone without the back-and-forth texts/emails!"
        />
        <meta property="twitter:image" content="/banner.png" />
      </Head>
      <Layout>
        <div className="global-page-section">
          <Container className="global-container">
            <Jumbotron className="new-poll-timeslot-jumbo">
              <KukkeeRBC pollTimes={pollTimes} setTimes={setTimes} />
            </Jumbotron>
            <Jumbotron className="new-poll-jumbo">
              <Row>
                <Col sm>
                  <Form.Control
                    className="form-text"
                    type="text"
                    maxLength={30}
                    placeholder="Title"
                    name="pollTitle"
                    onChange={handlePollDetailsChange}
                  />
                </Col>
                <Col sm>
                  <Form.Control
                    className="form-text"
                    type="text"
                    name="pollDescription"
                    maxLength={50}
                    placeholder="Description"
                    onChange={handlePollDetailsChange}
                  />
                </Col>
                <Col sm>
                  <Form.Control
                    className="form-text"
                    type="text"
                    name="pollLocation"
                    maxLength={40}
                    placeholder="Location"
                    onChange={handlePollDetailsChange}
                  />
                </Col>
                <Col sm="auto">
                  <Button
                    className="global-primary-button"
                    onClick={handleSubmit}
                    disabled={disabled}
                  >
                    {!disabled ? (
                      `Create`
                    ) : (
                      <>
                        <Spinner
                          as="span"
                          animation="border"
                          size="sm"
                          role="status"
                          aria-hidden="true"
                          className="form-button-spinner"
                        />
                      </>
                    )}
                  </Button>
                </Col>
              </Row>
            </Jumbotron>
            <ToastContainer />
          </Container>
        </div>
      </Layout>
    </>
  );
};

export default Home;
