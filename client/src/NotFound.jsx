import React from 'react';
import {
    Container,
    Row,
    Col,
    Button,
} from 'reactstrap';

function NotFound() {
    return (
        <Container>
            <Row>
                <Col>
                    <div className="rounded px-3 px-sm-4 py-3 py-sm-5">
                        <h1 className="display-3">
                            Sorry, this page does not exist
                        </h1>
                        <p className="lead">
                            Please contact us if this problem persists, or:
                        </p>
                        <Button
                            color="primary"
                            href="/"
                        >
                            Back to Homepage
                        </Button>
                    </div>
                </Col>
            </Row>
        </Container>
    );
}
export default NotFound;
