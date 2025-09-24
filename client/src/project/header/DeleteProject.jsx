import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
} from 'reactstrap';
import { Trash } from 'react-feather';
import { ProjectContext } from '../Context';

function DeleteProject() {
    const [isOpen, setOpen] = useState(false);
    const toggle = () => setOpen(!isOpen);
    const { removeProject } = useContext(ProjectContext);
    const navigate = useNavigate();
    return (
        <>
            <Button
                color="danger"
                className="m-1"
                onClick={toggle}
            >
                <Trash size="14" />
                {' '}
                Delete Project
            </Button>
            <Modal isOpen={isOpen} toggle={toggle}>
                <ModalHeader toggle={toggle}> Delete Project? </ModalHeader>
                <ModalBody>
                    Are you sure you want to remove this project
                </ModalBody>
                <ModalFooter>
                    <Button
                        color="danger"
                        onClick={() => {
                            removeProject();
                            toggle();
                            navigate('/');
                        }}
                    >
                        Delete
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
export default DeleteProject;
