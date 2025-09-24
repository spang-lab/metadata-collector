import React, { useContext, useState } from 'react';
import yaml from 'js-yaml';
import { Plus } from 'react-feather';
import {
    Col,
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Form,
    FormGroup,
    Input,
    Label,
} from 'reactstrap';

import { PropertiesContext } from './Context';

import { toSnakeCase } from '../util';

function AddProperty() {
    const [isOpen, setOpen] = useState(false);
    const toggle = () => setOpen(!isOpen);

    const { addProperty } = useContext(PropertiesContext);

    const [property, setProperty] = useState({ type: 'both', data: { type: 'input' } });

    const changeName = (e) => {
        const name = e.target.value;
        const newKey = toSnakeCase(name);
        const newData = { ...property.data, name };
        setProperty({ ...property, key: newKey, data: newData });
    };

    const changeKey = (e) => {
        const newKey = e.target.value;
        setProperty({
            ...property,
            key: newKey,
        });
    };
    const setType = (type) => {
        setProperty({
            ...property,
            type,
        });
    };
    const toggleMarkdown = () => {
        const { data } = property;
        const type = (data.type === 'markdown') ? 'input' : 'markdown';
        setProperty({ ...property, data: { ...data, type } });
    };

    return (
        <>
            <Button
                color="success"
                onClick={toggle}
            >
                <Plus size="14" />
                {' '}
                Add new
                <br />
                property
            </Button>
            <Modal size="lg" isOpen={isOpen} toggle={toggle}>
                <ModalHeader toggle={toggle}> Add a property</ModalHeader>
                <ModalBody>
                    <Form>
                        <FormGroup row>
                            <Label for="Name" sm={2}>Name</Label>
                            <Col sm={10}>
                                <Input
                                    value={property.name}
                                    onChange={changeName}
                                    name="name"
                                    id="name"
                                    placeholder="enter a name"
                                />
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label for="key" sm={2}>Key</Label>
                            <Col sm={10}>
                                <Input
                                    value={property.key || ''}
                                    onChange={changeKey}
                                    name="key"
                                    id="key"
                                    placeholder="enter a unique key"
                                />
                            </Col>
                        </FormGroup>
                        <FormGroup tag="fieldset" row>
                            <Label for="key" sm={2}>Type</Label>
                            <Col sm={10}>
                                <FormGroup check inline>
                                    <Label check>
                                        <Input
                                            type="radio"
                                            name="radio"
                                            checked={property.type === 'project'}
                                            onChange={() => setType('project')}
                                        />
                                        {' '}
                                        Project
                                    </Label>
                                </FormGroup>
                                <FormGroup check inline>
                                    <Label check>
                                        <Input
                                            type="radio"
                                            name="radio"
                                            checked={property.type === 'sample'}
                                            onChange={() => setType('sample')}
                                        />
                                        {' '}
                                        Sample
                                    </Label>
                                </FormGroup>
                                <FormGroup check inline>
                                    <Label check>
                                        <Input
                                            type="radio"
                                            name="radio"
                                            checked={property.type === 'both'}
                                            onChange={() => setType('both')}
                                        />
                                        {' '}
                                        Both
                                    </Label>
                                </FormGroup>
                                <FormGroup check>
                                    <Input
                                        onChange={toggleMarkdown}
                                        type="checkbox"
                                    />
                                    {' '}
                                    <Label check>
                                        Markdown
                                    </Label>
                                </FormGroup>
                            </Col>
                        </FormGroup>
                    </Form>
                    {JSON.stringify(property, null, 2)}
                </ModalBody>
                <ModalFooter>
                    <Button
                        color="success"
                        onClick={() => {
                            addProperty(property);
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
export default AddProperty;
