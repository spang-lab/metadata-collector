import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col } from 'reactstrap';

import { GlobalContext } from './Context';

const Footer = () => {
    const { version } = useContext(GlobalContext);

    return (
        <div className="border-top mt-3 p-5 text-center text-muted">
            <Container>
                <Row>
                    <Col>
                        <p>
                            <a href="http://genomics.uni-regensburg.de/">
                                Institute of Functional Genomics
                            </a>
                            <span>
                                {' '}
                                - Statistical Bioinformatics Department
                            </span>
                        </p>
                        <p>
                            <a href="http://www.uni-regensburg.de/">
                                University of Regensburg
                            </a>
                            {' '}
                            ©
                            {(new Date()).getFullYear()}
                            {' '}
                            Version
                            {' '}
                            {version}
                        </p>
                        <Link to="/contact" href="/contact">
                            Contact/Impressum
                        </Link>
                        <span> · </span>
                        <Link to="/privacy" href="/privacy">
                            Privacy Policy
                        </Link>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};
export default Footer;
