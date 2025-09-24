/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState, useContext } from 'react';

import {
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    Form,
    FormGroup,
    Input,
    Col,
} from 'reactstrap';
import { Trash } from 'react-feather';

import { Markdown } from '../../util';
import { ProjectContext } from '../Context';

function MarkdownCell(props) {
    const { property } = props;
    const { value } = property;
    const { setProperty } = useContext(ProjectContext);

    const [isOpen, setOpen] = useState(false);
    const [newValue, setValue] = useState(value);
    const toggle = () => setOpen(!isOpen);

    const submit = () => {
        setProperty(property, newValue);
        toggle();
    };
    const deleteProperty = () => {
        setProperty(property, null);
    };

    return (
        <Col md={9}>
            <div
                style={{ minHeight: '35px' }}
                role="button"
                tabIndex={0}
                className="p-1 m-0 border rounded"
                onClick={() => setOpen(true)}
            >
                <Markdown
                    value={value}
                />
            </div>
            <Modal isOpen={isOpen} toggle={toggle}>
                <ModalHeader toggle={toggle}>
                    Edit Markdown
                </ModalHeader>
                <ModalBody>
                    <Form>
                        <FormGroup>
                            <Input
                                id="valueInput"
                                type="textarea"
                                rows="3"
                                value={newValue}
                                onChange={(e) => setValue(e.target.value)}
                            />
                        </FormGroup>
                    </Form>
                    <h5>Preview:</h5>
                    <Markdown value={newValue} />
                </ModalBody>
                <ModalFooter>
                    <Button
                        color="success"
                        onClick={submit}
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

        </Col>
    );
}
export default MarkdownCell;
