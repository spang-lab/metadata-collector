import React, {
    useState,
    useContext,
    useCallback,
    useMemo,
    useEffect,
} from 'react';

import {
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    Form,
    FormGroup,
    Input,
} from 'reactstrap';

import { Markdown } from '../../util';
import { SampleContext } from './Context';

export const MarkdownContext = React.createContext({});

export function MarkdownState(props) {
    const { children } = props;

    const { editValue } = useContext(SampleContext);

    const [cell, setCell] = useState(null);
    const [newValue, setValue] = useState('');

    const openModal = useCallback((c) => setCell(c), []);
    const closeModal = useCallback(() => {
        setCell(null);
        setValue('');
    }, []);

    const submit = () => {
        if (!cell) {
            return;
        }
        const { sample, column } = cell;
        editValue(sample, column, newValue);
        closeModal();
    };

    const cvalue = useMemo(() => ({
        openModal,
        closeModal,
    }), [openModal, closeModal]);

    useEffect(() => {
        if (cell && cell.data) {
            const { value } = cell.data;
            if (value) {
                setValue(value);
            }
        }
    }, [cell]);

    return (
        <MarkdownContext.Provider
            value={cvalue}
        >
            {children}
            <Modal isOpen={!!cell} toggle={closeModal}>
                <ModalHeader toggle={closeModal}>
                    Edit Cell
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
                        onClick={closeModal}
                    >
                        Cancel
                    </Button>
                </ModalFooter>
            </Modal>
        </MarkdownContext.Provider>
    );
}
