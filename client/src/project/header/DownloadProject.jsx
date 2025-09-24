import React, { useContext, useState } from 'react';
import { Download } from 'react-feather';
import { Button } from 'reactstrap';

import { ProjectContext } from '../Context';

function DownloadProject() {
    const { project } = useContext(ProjectContext);
    const { id } = project;
    const url = `/api/v1/project/${id}/download/excel`;
    return (
        <Button
            color="success"
            className="m-1"
            tag="a"
            href={url}
        >
            <Download size="14" />
            {' '}
            Download Project
        </Button>
    );
}
export default DownloadProject;
