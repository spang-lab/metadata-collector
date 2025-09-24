import React, { useState, useContext } from 'react';
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Container,
    Row,
    Col,
} from 'reactstrap';

import QRCode from 'qrcode';

import { GlobalContext } from '../app/Context';

function QRCodeModal(props) {
    const { id } = props;
    const [isOpen, setOpen] = useState(false);
    const [qrcode, setQRcode] = useState(null);
    const { clientConfig } = useContext(GlobalContext);
    const { publicUrl } = clientConfig;
    const url = `${publicUrl}/id/${id}`;

    const generate = async () => {
        const options = {
            errorCorrectionLevel: 'H',
            scale: 2,
        };
        const dataUrl = await QRCode.toDataURL(url, options);
        setQRcode(dataUrl);
    };
    const toggle = () => {
        if (!qrcode) {
            generate();
        }
        setOpen(!isOpen);
    };

    const getQr = () => {
        if (!qrcode) return '';
        return <img src={qrcode} alt="QR code" />;
    };

    return (
        <>
            <Button
                color="link"
                className=""
                onClick={toggle}
            >
                {id}
            </Button>
            <Modal size="sm" isOpen={isOpen} toggle={toggle}>
                <ModalHeader toggle={toggle}> QRCode </ModalHeader>
                <ModalBody>
                    <Container fluid>
                        <Row>
                            <Col md="5">
                                {getQr()}
                            </Col>
                            <Col md="7" style={{ wordWrap: 'break-word' }}>

                                {id}
                                <br />
                                <a href={url}>
                                    {url}
                                </a>
                            </Col>
                        </Row>
                    </Container>
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
export default QRCodeModal;
