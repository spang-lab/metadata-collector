import React from 'react';
import { Container, Row, Col } from 'reactstrap';

function PrivacyPolicy() {
    return (
        <Container fluid>

            <Row>
                <Col sm={{ size: 10, offset: 1 }} className="p-3">
                    <h1 className="pb-2 mt-4 mb-2 border-bottom">
                        Privacy
                    </h1>
                    <h3>
                        Cookies
                    </h3>
                    <p>
                        This website does not use cookies except a session cookie
                        required for user login.
                    </p>
                    <h3> Server Log </h3>
                    <p>
                        The web server keeps a log of all requests, with the following data:
                    </p>
                    <ul>
                        <li> The request IP adress </li>
                        <li> Date and Time of the request </li>
                        <li> request type and path </li>
                        <li> the User-Agent of the web browser </li>
                    </ul>
                    This data is only used to diagnose tecnical problems.

                    <h3> Web Analytics / Other Tracking </h3>
                    There are no other tracking methods.

                    <h3> User Login </h3>
                    Users can sign in and give personal information to this application.
                    <br />
                    Login is handled via
                    {' '}
                    <a href="auth.spang-lab.de"> auth.spang-lab.de </a>
                    {' '}
                    and its privacy policy applies.
                    <br />
                    We use the OpenID Connect Protocol,
                    and consent for user data has to be granted by
                    the user during the sign-in process.

                    <h3> Privacy Contact </h3>
                    <a href="http://www.uni-regensburg.de/universitaet/datenschutzbeauftragte/index.html">
                        http://www.uni-regensburg.de/universitaet/datenschutzbeauftragte/index.html
                    </a>
                </Col>
            </Row>
        </Container>
    );
}

export default PrivacyPolicy;
