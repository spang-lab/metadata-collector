/* global FormData */
import React, { useState, useContext } from 'react';
import { Upload } from 'react-feather';
import {
    Form,
    FormGroup,
    Input,
    Button,
    Col,
    Label,
} from 'reactstrap';

import { PropertiesContext } from './Context';

function UploadProperties() {
    const [file, setFile] = useState(null);

    const { uploadProperties } = useContext(PropertiesContext);

    const onChange = (e) => setFile(e.target.files[0]);

    const submit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('file', file);
        uploadProperties(formData);
    };

    return (
        <Form onSubmit={submit}>
            <FormGroup row>
                <Label
                    for="propertiesFile"
                    sm={2}
                >
                    Properties File
                </Label>
                <Col sm={8}>
                    <Input
                        id="propertiesFile"
                        onChange={onChange}
                        name="file"
                        type="file"
                    />
                </Col>
                <Col sm={2}>
                    <Button
                        type="submit"
                        color="secondary"
                        className="m-1"
                    >
                        <Upload size="14" />
                        {' '}
                        Upload
                    </Button>
                </Col>
            </FormGroup>
        </Form>
    );
}
export default UploadProperties;
