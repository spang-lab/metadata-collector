import React, { useState, useContext } from 'react';

import {
    Container,
    Row,
    Col,
    Form,
    FormGroup,
    Label,
    Input,
    FormText,
    Button,
    FormFeedback,
} from 'reactstrap';
import { Link, useNavigate } from 'react-router-dom';

import { GlobalContext } from '../app/Context';

function ProjectForm() {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const { api, fetchProjects } = useContext(GlobalContext);
    const navigate = useNavigate();

    const [nameError, setNameError] = useState(null);

    const nameChanged = (e) => {
        const newName = e.target.value;
        setName(newName);
        if (newName.length < 3) {
            setNameError('Please choose a name longer than 3 characters');
            return;
        }
        if (newName.length > 64) {
            setNameError('Please choose a name shorter than 64 characters');
            return;
        }
        setNameError(null);
    };

    const submit = async (e) => {
        e.preventDefault();
        return api({
            path: '/api/v1/project/new',
            name,
            description,
        }, () => {
            fetchProjects();
            navigate('/');
        });
    };

    return (
        <Form onSubmit={(e) => submit(e)}>
            <Row form>
                <Col md={6}>
                    <FormGroup>
                        <Label for="projectName">Project Name:</Label>
                        <Input
                            invalid={nameError !== null}
                            id="projectName"
                            bsSize="lg"
                            onChange={nameChanged}
                            placeholder="my awesome new project"
                        />
                        <FormFeedback>
                            {nameError}
                        </FormFeedback>
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
                    Please enter a descriptive name for your new project
                </FormText>
            </FormGroup>
            <Row form>
                <Col md={8}>
                    <Button
                        size="lg"
                        color="success"
                        disabled={name.length === 0 || nameError !== null}
                    >
                        Create Project
                    </Button>
                </Col>
                <Col>
                    <Link
                        className="btn btn-secondary"
                        to="/"
                    >
                        Cancel

                    </Link>
                </Col>
            </Row>
        </Form>
    );
}

function NewProject() {
    return (
        <Container>
            <Row>
                <Col>
                    <h2 className="py-2">
                        Create a new project
                    </h2>
                </Col>
            </Row>
            <Row>
                <Col>
                    <ProjectForm />
                </Col>
            </Row>
        </Container>
    );
}
export default NewProject;
