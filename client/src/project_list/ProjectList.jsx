import React from 'react';
import {
    Container,
    Row,
    Col,
    Alert,
} from 'reactstrap';
import { ProjectListState } from './Context';

import ProjectCards from './ProjectCards';

function Title() {
    return (
        <div className="rounded px-3 px-sm-4 py-3 py-sm-5">
            <Container fluid>
                <Row>
                    <Col sm="3" xs="4">
                        <img
                            src="/images/trr_transparent.png"
                            width="100%"
                            alt=""
                        />
                    </Col>

                    <Col xs="12" sm="9">
                        <h1 className="display-4">
                            Metadata Collector
                        </h1>
                        <p className="text-muted">
                            TRR 305
                        </p>
                        <p className="lead">
                            This is the metadata collection service provided by the Spang Lab.
                            You can enter, access and download metadata for your sequencing
                            projects.
                        </p>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

function Home() {
    return (
        <ProjectListState>
            <Container fluid>
                <Row>
                    <Col lg={{ offset: 1, size: 10 }} xl={{ offset: 2, size: 8 }}>
                        <Title />
                    </Col>
                </Row>
                <Row>
                    <Col lg={{ offset: 1, size: 10 }} xl={{ offset: 2, size: 8 }}>
                        <ProjectCards />
                    </Col>
                </Row>
            </Container>
        </ProjectListState>
    );
}
export default Home;
