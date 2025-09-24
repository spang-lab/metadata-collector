import React, { useContext, useState } from 'react';
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
} from 'reactstrap';
import { List } from 'react-feather';
import { ProjectContext } from '../Context';

import { formatDate } from '../../util';

function HistoryEntry(props) {
    const { event } = props;
    const {
        owner, data, key, value, timestamp, mnemonic, isparent,
    } = event;
    const { name } = data;

    let sampleText = `of sample ${mnemonic}`;
    if (isparent) {
        sampleText = '';
    }

    let text = ` set property ${name} (${key}) ${sampleText} to "${value}"`;
    if (!value) {
        text = ` deleted property ${name} (${key}) ${sampleText}`;
    }

    return (
        <p>
            <span className="text-primary px-2">
                {formatDate(timestamp)}
            </span>
            <i>
                {owner}
            </i>
            {text}
        </p>
    );
}

function MetadataHistory() {
    const [isOpen, setOpen] = useState(false);
    const { history, fetchHistory } = useContext(ProjectContext);
    const toggle = () => {
        if (!isOpen) {
            fetchHistory();
        }
        setOpen(!isOpen);
    };

    return (
        <>
            <Button
                color="secondary"
                outline
                className="m-1"
                onClick={toggle}
            >
                <List size="16" />
                {' '}
                History
            </Button>
            <Modal size="lg" isOpen={isOpen} toggle={toggle}>
                <ModalHeader toggle={toggle}> Metadata History </ModalHeader>
                <ModalBody>
                    <div style={{ height: '400px', overflow: 'auto' }}>

                        {history.map((e) => <HistoryEntry key={e.id} event={e} />)}
                    </div>
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
export default MetadataHistory;
