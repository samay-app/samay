import { Container, Row, Col } from "react-bootstrap";
import Head from "next/head";
import Layout from "../src/components/Layout";

const Privacy = (): JSX.Element => {
  return (
    <>
      <Head>
        <title>Privacy | Kukkee</title>
        <link rel="shortcut icon" href="/Kukkee-favicon.svg" />
        <meta name="description" content="Kukkee" />
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <Layout>
        <Container className="kukkee-container">
          <Row>
            <Col className="inside-page">
              <h1>Privacy Policy</h1>
              <p>Last updated: March 15, 2022</p>
              <p>
                Hello! Welcome to Kukkee. Here's how we protect your data and
                respect your privacy.
              </p>
              <h2>Our role in your privacy </h2>
              <p>
                If you are creating a poll on Kukkee or voting on a poll, or
                just visiting our website, this policy applies to you.
              </p>
              <h3>Your responsibilities</h3>
              <p>
                <ul>
                  <li>Read this Privacy Policy.</li>
                  <li>Do not impersonate anyone else on polls.</li>
                  <li>
                    If you provide us with personal availability information
                    about other people, or if others give us your personal
                    availability information, we will only use that information
                    for the specific reason for which it was provided to us. By
                    submitting the information, you confirm that you have the
                    right to authorise us to process it on your behalf in
                    accordance with this Privacy Policy.
                  </li>
                </ul>
              </p>
              <h2>What data we collect</h2>
              <p>
                Information about events and your availability for the those
                events which you enter in a poll.
              </p>
              <h2>How and why we use your data</h2>
              <p>
                Data protection law means that we can only use your data for
                certain reasons and where we have a legal basis to do so. We use
                the data solely to ensure the functionality of Kukkee — which is
                to help you find the best time for meetings.
              </p>
              <h2>Your times</h2>
              <p>
                <ul>
                  <li>
                    You can choose not to provide us with event or personal
                    availability information. If you choose to do this, you can
                    continue browse this website's pages, but you won't be able
                    to create polls or vote on polls.
                  </li>
                  <li>
                    You can turn off cookies in your browser by changing its
                    settings. You can block cookies by activating a setting on
                    your browser allowing you to refuse cookies. You can also
                    delete cookies through your browser settings. If you turn
                    off cookies, you can continue to use the website and browse
                    its pages, but Kukkee's user experience would deteriorate.
                  </li>
                </ul>
              </p>
              <h2>Your rights</h2>
              <p>
                You can exercise your rights by contacting us.
                <ul>
                  <li>
                    You have the right to access information we hold about you.
                    We will provide you with the information within one month of
                    your request, unless doing so would adversely affect the
                    rights and freedoms of other (e.g. another person's personal
                    or event details). We'll tell you if we can't meet your
                    request for that reason.
                  </li>
                  <li>
                    You have the right to make us correct any inaccurate
                    personal data about you.
                  </li>
                  <li>
                    You have the right to be 'forgotten' by us. You can do this
                    by deleting the polls you created.
                  </li>
                  <li>
                    You have the right to lodge a complaint regarding our use of
                    your data. But please tell us first, so we have a chance to
                    address your concerns.
                  </li>
                </ul>
              </p>
              <h2>Where do we store the data?</h2>
              <p>
                We use MongoDB's{" "}
                <a href="https://www.mongodb.com/legal/privacy-policy">Atlas</a>{" "}
                cloud database service to store all the events and your
                availability information.
              </p>
              <h2>How long do we store your data?</h2>
              <p>
                We will delete every poll 1 month after the event associated
                with the poll is over.
              </p>
              <h2>Cookies</h2>
              <p>
                We use cookies. Unless you adjust your browser settings to
                refuse cookies, we (and these third parties) will issue cookies
                when you interact with Kukkee. These are 'persistent' cookies
                which do not delete themselves and help us recognise you when
                you return so we can provide a tailored service.
              </p>
              <h3>How can I block cookies?</h3>
              <p>
                You can block cookies by activating a setting on your browser
                allowing you to refuse the setting of cookies. You can also
                delete cookies through your browser settings. If you use your
                browser settings to disable, reject, or block cookies (including
                essential cookies), certain parts of our website's user
                experience would deteriorate.
              </p>
              <p>
                This privacy notice is based on an open-sourced design from{" "}
                <a href="https://juro.com/">Juro</a> and{" "}
                <a href="https://stefaniapassera.com/">Stefania Passera</a> -
                get your own{" "}
                <a href="https://info.juro.com/privacy-policy-template">
                  free privacy policy template
                </a>
                .
              </p>
            </Col>
          </Row>
        </Container>
      </Layout>
    </>
  );
};

export default Privacy;
