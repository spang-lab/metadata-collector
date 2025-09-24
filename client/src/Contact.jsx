import React, { useContext } from 'react';
import {
    Container,
    Row,
    Col,
    Card,
    CardBody,
    CardTitle,
    CardSubtitle,
    CardText,
} from 'reactstrap';

import { GlobalContext } from './app/Context';

function Contact() {
    const { clientConfig } = useContext(GlobalContext);
    const {
        organisation, department, street, city, country, email, phone,
    } = clientConfig;
    return (
        <Container className="pt-3">
            <h3> Contact </h3>
            <Row>
                <Col md="3">
                    <Card>
                        <CardBody>
                            <CardTitle tag="h5">{organisation}</CardTitle>
                            <CardSubtitle tag="h6" className="mb-2 text-muted">{department}</CardSubtitle>
                            <CardText>

                                <address>
                                    {street}
                                    <br />
                                    {city}
                                    <br />
                                    {country}
                                    <br />
                                    <a href={`mailto:${email}`}>
                                        {email}
                                    </a>
                                    <br />
                                    {phone}

                                </address>
                            </CardText>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}
export default Contact;
