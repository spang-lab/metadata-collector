import React from 'react';
import { Download } from 'react-feather';
import { Button } from 'reactstrap';

function DownloadProperties() {
    return (
        <Button
            color="success"
            className="m-1"
            tag="a"
            href="/api/v1/properties/download"
        >
            <Download size="14" />
            {' '}
            Download Properties
        </Button>
    );
}
export default DownloadProperties;
