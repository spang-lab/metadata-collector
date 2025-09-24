import React, { useState, useContext } from 'react';
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    ListGroup,
} from 'reactstrap';
import { Plus } from 'react-feather';
import PropertyListItem from './PropertyListItem';

import { SampleContext } from '../Context';
import { ProjectContext } from '../../Context';

function AddColumn() {
    const { addColumn, columns } = useContext(SampleContext);
    const { properties } = useContext(ProjectContext);
    const [newColumn, setColumn] = useState({});
    const [isOpen, setOpen] = useState(false);
    const toggle = () => setOpen(!isOpen);

    const columnKeys = columns.map((c) => c.key);
    const addableColumns = properties
        .filter((p) => ['sample', 'both'].includes(p.type))
        .filter((prop) => !columnKeys.includes(prop.key));

    return (
        <>
            <Button
                color="success"
                className="m-1 px-3 text-nowrap"
                onClick={toggle}
            >
                <Plus size="14" />
                Add a column
            </Button>
            <Modal size="lg" isOpen={isOpen} toggle={toggle}>
                <ModalHeader toggle={toggle}> Add Metadata </ModalHeader>
                <ModalBody>
                    <h5> Select a new Column </h5>
                    <ListGroup>
                        {addableColumns.map((p) => (
                            <PropertyListItem
                                key={p.key}
                                property={p}
                                selected={newColumn.key === p.key}
                                onSelect={setColumn}
                                onDoubleClick={(pr) => {
                                    addColumn(pr.key);
                                    toggle();
                                }}
                            />
                        ))}
                    </ListGroup>
                </ModalBody>
                <ModalFooter>
                    <Button
                        color="success"
                        disabled={!newColumn.key}
                        onClick={() => {
                            addColumn(newColumn.key);
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
export default AddColumn;
