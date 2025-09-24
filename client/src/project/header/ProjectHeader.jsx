import React, { useContext } from 'react';

import {
    Container,
    Row,
    Col,
} from 'reactstrap';

import { Loader, formatDate } from '../../util';
import { ProjectContext } from '../Context';

import DeleteProject from './DeleteProject';
import DownloadProject from './DownloadProject';
import UploadProject from './UploadProject';

import History from './History';

function ProjectHeader() {
    const { project } = useContext(ProjectContext);
    if (!project) {
        return (
            <Loader />
        );
    }
    const { edited } = project;
    return (
        <Container fluid>
            <Row>
                <Col>
                    <h2 className="pt-2">
                        Manage Project
                    </h2>
                    <p className="text-muted">
                        Last edit:
                        {' '}
                        {formatDate(edited)}
                    </p>
                </Col>
                <Col md={4} className="p-2 text-right">
                    <History />
                    <DownloadProject />
                    <UploadProject />
                    <DeleteProject />
                </Col>
            </Row>
        </Container>

    );
}
export default ProjectHeader;
