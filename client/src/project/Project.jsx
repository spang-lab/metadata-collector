import React from 'react';

import {
    Container,
    Row,
    Col,
} from 'reactstrap';

import { ProjectState } from './Context';

import ProjectHeader from './header/ProjectHeader';
import ProjectProperties from './properties/ProjectProperties';
import ProjectMembers from './ProjectMembers';
import Samples from './samples/Samples';

function Project() {
    return (
        <ProjectState>
            <Container>
                <Row>
                    <Col>
                        <ProjectHeader />
                    </Col>
                </Row>
                <Row>
                    <Col md={12} lg={8}>
                        <ProjectProperties />
                    </Col>
                    <Col>
                        <ProjectMembers />
                    </Col>
                </Row>
            </Container>
            <Container fluid>
                <Row>
                    <Col>
                        <Samples />
                    </Col>
                </Row>
            </Container>
        </ProjectState>
    );
}

export default Project;
