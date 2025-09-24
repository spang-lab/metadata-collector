import React, { useContext } from 'react';
import {
    Alert,
    Container,
    Row,
    Col,
} from 'reactstrap';

import { GlobalContext } from './Context';

function Message(props) {
    const { message } = props;
    const { color, bold, text } = message;
    return (
        <Alert
            className="my-2"
            color={color}
        >
            <strong>
                {bold}
            </strong>
            {text}
        </Alert>
    );
}

function Messages() {
    const { messages } = useContext(GlobalContext);
    if (messages.length === 0) {
        return '';
    }
    return (
        <Container>
            <Row>
                <Col>
                    {messages.map((m) => <Message key={m.id} message={m} />)}
                </Col>
            </Row>
        </Container>
    );
}
export default Messages;
