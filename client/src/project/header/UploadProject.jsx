/* global FormData */
import React, { useContext, useState, useRef } from 'react';
import {
    Col,
    Form,
    FormGroup,
    Input,
    Label,
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
} from 'reactstrap';
import { Upload } from 'react-feather';
import { ProjectContext } from '../Context';

function UploadButton() {
    const inputRef = useRef(null);
    const [isOpen, setOpen] = useState(false);
    const [file, setFile] = useState(null);
    const { uploadProject } = useContext(ProjectContext);
    const toggle = () => {
        setOpen(!isOpen);
    };

    const onChange = (e) => setFile(e.target.files[0]);

    const submit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('file', file);
        uploadProject(formData);
        setFile(null);
        if (inputRef.current) {
            inputRef.current.value = '';
        }
    };

    return (
        <>
            <Button
                color="secondary"
                outline
                className="m-1"
                onClick={toggle}
            >
                <Upload size="14" />
                {' '}
                Upload Excel
            </Button>
            <Modal size="lg" isOpen={isOpen} toggle={toggle}>
                <ModalHeader toggle={toggle}> Upload Excel File </ModalHeader>
                <ModalBody>
                    <Form onSubmit={submit}>
                        <FormGroup row>
                            <Label
                                for="propertiesFile"
                                sm={2}
                            >
                                Project File
                            </Label>
                            <Col sm={8}>
                                <Input
                                    innerRef={inputRef}
                                    id="propertiesFile"
                                    onChange={onChange}
                                    name="file"
                                    type="file"
                                />
                            </Col>
                            <Col sm={2}>
                                <Button
                                    disabled={!file}
                                    type="submit"
                                    color="success"
                                    className="m-1"
                                >
                                    <Upload size="14" />
                                    {' '}
                                    Upload
                                </Button>
                            </Col>
                        </FormGroup>
                    </Form>
                    <p>
                        Upload is only possible for previously downloaded excel files.
                    </p>
                </ModalBody>
                <ModalFooter>
                    <Button
                        color="secondary"
                        onClick={toggle}
                    >
                        Cancel
                    </Button>
                </ModalFooter>
            </Modal>
        </>
    );
}
export default UploadButton;
