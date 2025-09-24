import React, { useContext } from 'react';

import {
    Container,
    Row,
    Col,
    Card,
    CardBody,
    CardTitle,
    CardSubtitle,
    CardFooter,
} from 'reactstrap';
import {
    Link,
} from 'react-router-dom';
import { Lock } from 'react-feather';

import { Markdown } from '../util';

function ProjectCard(props) {
    const { project } = props;
    const {
        name,
        description,
        id,
        owner,
        ownerName,
        ownerEmail,
        url,
        access,
    } = project;
    const getButton = () => {
        if (access) {
            return (
                <Link
                    className="btn btn-primary"
                    to={url}
                >
                    View Project
                </Link>
            );
        }
        return (
            <span className="text-muted">
                <Lock size="16" />
                No Access
            </span>
        );
    };

    return (
        <Card className="m-3">
            <CardBody>
                <Container fluid>
                    <Row>
                        <Col md="9">
                            <CardTitle tag="h5">
                                <Link to={url}>
                                    { name}
                                </Link>
                            </CardTitle>
                            <CardSubtitle
                                tag="h6"
                                className="text-muted mb-3"
                            >
                                #
                                {id}
                            </CardSubtitle>
                        </Col>
                        <Col className="text-right">
                            {getButton()}
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Markdown value={description} />
                        </Col>
                    </Row>
                </Container>
            </CardBody>
            <CardFooter>
                <Container fluid className="text-muted">
                    <Row>
                        <Col>
                            Owner:
                            {' '}
                            {owner}
                        </Col>
                        <Col>
                            Name:
                            {' '}
                            {ownerName}
                        </Col>

                        <Col>
                            Email:
                            {' '}
                            <a href={`mailto:${ownerEmail}`}>
                                {ownerEmail}
                            </a>
                        </Col>
                    </Row>
                </Container>
            </CardFooter>
        </Card>
    );
}

export default ProjectCard;
