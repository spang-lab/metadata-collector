import React, { useContext } from 'react';

import {
    Container,
    Row,
    Col,
} from 'reactstrap';

import { ProjectListContext } from './Context';
import ProjectCard from './ProjectCard';
import AddProject from './AddProject';

function ProjectCards() {
    const { projects } = useContext(ProjectListContext);
    return (
        <Container fluid>
            <Row>
                <Col>
                    <h2> Projects: </h2>
                </Col>
                <Col className="text-end">
                    <AddProject />
                </Col>
            </Row>
            <Row>
                <Col>
                    {projects.map((p) => (
                        <ProjectCard
                            project={p}
                            key={p.id}
                        />
                    ))}
                </Col>
            </Row>
        </Container>

    );
}
export default ProjectCards;
