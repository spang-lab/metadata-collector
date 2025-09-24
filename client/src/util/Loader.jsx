import React from 'react';

import {
    Container,
    Row,
    Col,
} from 'reactstrap';

const Loader = () => (
    <Container>
        <Row>
            <Col className="text-center">
                <img src="/images/loader.webp" alt="Loading animation" />
                <p className="text-muted">
                    Loading...
                </p>
            </Col>
        </Row>
    </Container>
);
export default Loader;
