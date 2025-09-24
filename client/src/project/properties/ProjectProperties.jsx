import React, { useContext } from 'react';

import {
    Container,
    Row,
    Col,
    ListGroup,
    ListGroupItem,
} from 'reactstrap';

import {
    LastEdited, Markdown,
} from '../../util';

import { ProjectContext } from '../Context';

import AddProperty from './AddProperty';
import Cell from './Cell';

function ProjectProperty(props) {
    const { property, project } = props;
    const { data, value } = property;
    const { name } = data;

    return (
        <ListGroupItem>
            <Container fluid>
                <Row>
                    <Col md="2" className="border-right px-3">
                        <strong>
                            {name}
                        </strong>
                        <br />
                        <LastEdited property={property} />
                    </Col>
                    <Cell project={project} property={property} />
                </Row>
            </Container>
        </ListGroupItem>
    );
}

function ProjectProperties() {
    const { project } = useContext(ProjectContext);
    const { properties } = project;
    return (
        <ListGroup>
            {properties.map((p) => (
                <ProjectProperty
                    project={project.id}
                    property={p}
                    key={p.key}
                />
            ))}
            <ListGroupItem className="text-center">
                <AddProperty />
            </ListGroupItem>
        </ListGroup>
    );
}

export default ProjectProperties;
