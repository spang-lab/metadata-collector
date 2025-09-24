import React, { useContext, useState } from 'react';
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    ListGroup,
} from 'reactstrap';
import { Plus } from 'react-feather';

import { ProjectContext } from '../Context';

import PropertyListItem from './PropertyListItem';

function AddProjectMetadata() {
    const { project, setProperty, properties } = useContext(ProjectContext);
    const [isOpen, setOpen] = useState(false);
    const toggle = () => setOpen(!isOpen);

    const existingKeys = project.properties.map((p) => p.key);
    const addableProperties = properties
        .filter((p) => ['both', 'project'].includes(p.type))
        .filter((p) => !existingKeys.includes(p.key));

    const [property, setSelectedProperty] = useState({});

    const isEnabled = property && property.key;

    const onSelect = (prop) => {
        setSelectedProperty(prop);
    };
    const submit = () => {
        setProperty(property, '');
        setSelectedProperty({});
    };

    return (
        <>
            <Button
                color="success"
                className="m-1 px-5"
                onClick={toggle}
            >
                <Plus size="14" />
                {' '}
                Add new
            </Button>
            <Modal size="lg" isOpen={isOpen} toggle={toggle}>
                <ModalHeader toggle={toggle}> Add Metadata </ModalHeader>
                <ModalBody>
                    <h5> Select a new Property </h5>
                    <ListGroup>
                        {addableProperties.map((p) => (
                            <PropertyListItem
                                key={p.key}
                                property={p}
                                selected={property.key === p.key}
                                onSelect={() => onSelect(p)}
                                onDoubleClick={(pr) => {
                                    setProperty(pr, '');
                                    toggle();
                                }}
                            />
                        ))}
                    </ListGroup>
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
export default AddProjectMetadata;
