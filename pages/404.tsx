import Link from "next/link";
import { Container, Row, Col } from "react-bootstrap";
import Layout from "../src/components/layout";


const NotFound = (): JSX.Element => {

    return (
        <Layout>
            <Container fluid>
                <Row>
                    <Col>
                        <h1>Page not found</h1>
                        <h3>
                            <Link href="/">
                                <a>Landing page</a>
                            </Link>

                        </h3>

                    </Col>
                </Row>
            </Container>
        </Layout>
    );
};

export default NotFound;