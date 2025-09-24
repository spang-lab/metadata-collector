import React, { useContext, useState } from 'react';
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Row,
    Col,
    Form,
    FormGroup,
    FormText,
    Label,
    Input,
    FormFeedback,
} from 'reactstrap';
import { Plus } from 'react-feather';
import { Spinner } from '../util';

import { ProjectListContext } from './Context';

function AddProject() {
    const [isOpen, setOpen] = useState(false);
    const toggle = () => setOpen(!isOpen);
    const { addProject, templates } = useContext(ProjectListContext);

    const [project, setProject] = useState({});
    const [loading, setLoading] = useState(false);

    const isEnabled = project && project.name;

    const submit = async () => {
        setLoading(true);
        await addProject(project);
        setLoading(false);
        setProject({});
    };

    const setName = (name) => setProject({ ...project, name });
    const setDescription = (description) => setProject({ ...project, description });

    const setTemplate = (e) => {
        const id = e.target.value;
        const template = templates.find((t) => t.id === id);
        setProject({ ...project, template });
    };
    if (loading) {
        return <Spinner />;
    }

    return (
        <>
            <Button
                color="success"
                className="m-1 px-5"
                onClick={toggle}
            >
                <Plus size="14" />
                {' '}
                New Project
            </Button>
            <Modal size="lg" isOpen={isOpen} toggle={toggle}>
                <ModalHeader toggle={toggle}> New Project </ModalHeader>
                <ModalBody>
                    <Form onSubmit={(e) => submit(e)}>
                        <Row form>
                            <Col md={6}>
                                <FormGroup>
                                    <Label for="projectName">Project Name:</Label>
                                    <Input
                                        id="projectName"
                                        bsSize="lg"
                                        onChange={(e) => setName(e.target.value)}
                                        placeholder="my awesome new project"
                                    />
                                    <FormText>
                                        Please enter a descriptive name for your new project
                                    </FormText>
                                </FormGroup>
                            </Col>
                        </Row>
                        <FormGroup>
                            <Label for="projectDescription">Description:</Label>
                            <Input
                                id="projectDescription"
                                onChange={(e) => setDescription(e.target.value)}
                                type="textarea"
                                rows="5"
                                placeholder="(optional)"
                            />
                            <FormText>
                                Please enter a description for your new project
                            </FormText>
                        </FormGroup>
                        <FormGroup>
                            <Label for="templateSelect">
                                Template
                            </Label>
                            <Input
                                type="select"
                                id="templateSelect"
                                onChange={setTemplate}
                            >
                                <option value=""> Empty Project </option>
                                {templates.map((t) => (
                                    <option
                                        value={t.id}
                                        key={t.name}
                                    >
                                        {t.name}
                                    </option>
                                ))}
                            </Input>
                        </FormGroup>
                    </Form>
                </ModalBody>
                <ModalFooter>
                    <Button
                        color="success"
                        disabled={!isEnabled}
                        onClick={() => {
                            submit();
                            toggle();
                        }}
                    >
                        Submit
                    </Button>
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
export default AddProject;
