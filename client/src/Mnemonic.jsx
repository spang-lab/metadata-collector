import React, { useContext, useState } from 'react';
import {
    Container,
    Row,
    Col,
    Button,
} from 'reactstrap';

import { GlobalContext } from './app/Context';

function Mnemonic() {
    const { api } = useContext(GlobalContext);
    const [mnemonic, setMnemonic] = useState('');

    const generateMnemonic = async () => api({
        path: 'api/v1/mnemonic',
    }, (m) => setMnemonic(m));

    return (
        <Container className="pt-3">
            <h3> Mnemonic </h3>
            <Row>
                <Col>
                    <div className="rounded px-3 px-sm-4 py-3 py-sm-5">
                        <h1 className="display-3">{mnemonic}</h1>
                        <p className="lead">These are example identifiers generated from our mnemonic api</p>
                        <hr className="my-2" />
                        <p>This has no use except showcasing how identifiers work</p>
                        <p className="lead">
                            <Button
                                onClick={generateMnemonic}
                                color="primary"
                            >
                                Generate a new ID

                            </Button>
                        </p>
                    </div>
                </Col>
            </Row>
        </Container>
    );
}
export default Mnemonic;
