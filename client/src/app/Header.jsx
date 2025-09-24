/* global window */
import React, { useState, useContext } from 'react';
import {
    Collapse,
    Navbar,
    NavbarBrand,
    NavbarToggler,
    Nav,
    NavItem,
    NavLink,
    Badge,
} from 'reactstrap';
import { Link } from 'react-router-dom';

import { GlobalContext } from './Context';
import { UserContext } from './UserContext';

function Header() {
    const [isOpen, setOpen] = useState(false);
    const { clientConfig } = useContext(GlobalContext);
    const user = useContext(UserContext);
    const { sub, isAdmin } = user || {};
    const { logo, brand } = clientConfig;
    const toggle = () => setOpen(!isOpen);

    const getBadge = () => {
        if (!isAdmin) {
            return '';
        }
        return (
            <Badge
                pill
                className="p-2 mx-2"
                color="primary"

            >
                Admin
            </Badge>
        );
    };

    return (
        <div>
            <Navbar color="light" light expand="md">
                <NavbarBrand href="/">
                    <img
                        src={`/${logo}`}
                        width="30"
                        height="30"
                        alt="Logo"
                    />
                    {' '}
                    {brand}
                </NavbarBrand>
                <NavbarToggler onClick={toggle} />
                <Collapse isOpen={isOpen} navbar>
                    <Nav className="me-auto" navbar>
                        <NavItem className="px-3">
                            <NavLink tag="span">
                                <Link to="/">Home</Link>
                            </NavLink>
                        </NavItem>
                        <NavItem
                            className="px-3"
                            hidden={!isAdmin}
                        >
                            <NavLink tag="span">
                                <Link to="/properties">Properties</Link>
                            </NavLink>
                        </NavItem>
                        <NavItem
                            className="px-3"
                        >
                            <NavLink tag="span">
                                <Link to="/mnemonic">Mnemonic</Link>
                            </NavLink>
                        </NavItem>
                    </Nav>
                    <Nav className="text-muted px-3">
                        Logged in as
                        {' '}
                        {sub}
                        {getBadge()}
                    </Nav>
                    <NavLink
                        className="btn btn-secondary text-white"
                        href="/api/v1/logout"
                    >
                        Logout
                    </NavLink>
                </Collapse>
            </Navbar>
        </div>
    );
}
export default Header;
