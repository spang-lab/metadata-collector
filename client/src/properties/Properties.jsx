import React, { useContext, useState } from 'react';

import {
    Container,
    Row,
    Col,
    Input,
} from 'reactstrap';

import { PropertiesState, PropertiesContext } from './Context';
import Property from './Property';
import AddProperty from './AddProperty';
import DownloadProperties from './DownloadProperties';
import UploadProperties from './UploadProperties';

function PropertyList() {
    const { properties } = useContext(PropertiesContext);
    const [filter, setFilter] = useState('');
    const [sortKey, setSortKey] = useState('-id');

    const filterFun = (property) => {
        const {
            type, key, permission, entity, data,
        } = property;
        const fields = [type, key, permission, entity, Object.values(data)]
            .filter((f) => typeof f === 'string')
            .map((f) => f.toLowerCase());
        return fields.find((f) => f.includes(filter.toLowerCase()));
    };

    const sortFn = (propA, propB) => {
        const idA = parseInt(propA.id, 10);
        const idB = parseInt(propB.id, 10);

        switch (sortKey) {
        case 'id':
            return idA - idB;
        case '-id':
            return idB - idA;
        default:
            return propA.key.localeCompare(propB.key);
        }
    };

    return (
        <Container fluid>
            <Row className="mt-3">
                <Col md={{ offset: 1, size: 5 }}>
                    <h3> Properties </h3>
                </Col>
            </Row>
            <Row className="my-3">
                <Col md={{ offset: 1, size: 5 }}>
                    <Input
                        onChange={(e) => setFilter(e.target.value)}
                        placeholder="Filter properties..."
                    />
                </Col>
                <Col>
                    <AddProperty />
                </Col>
                <Col md={{ offset: 1, size: 3 }}>
                    <DownloadProperties />
                </Col>
            </Row>
            <Row>
                <Col sm={{ size: 10, offset: 1 }}>
                    <UploadProperties />
                </Col>
            </Row>
            <Row>
                {properties
                    .filter(filterFun)
                    .sort(sortFn)
                    .map((p) => (<Property key={p.id} property={p} />))}
            </Row>
        </Container>
    );
}

function Properties() {
    return (
        <PropertiesState>
            <PropertyList />
        </PropertiesState>
    );
}
export default Properties;
