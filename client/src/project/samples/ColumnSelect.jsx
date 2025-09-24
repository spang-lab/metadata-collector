import React, { useContext } from 'react';

import {
    Row,
    Col,
    Form,
    FormGroup,
    Label,
    Input,
} from 'reactstrap';

import { SampleContext } from './Context';

const Checkbox = (props) => {
    const { toggleColumn } = useContext(SampleContext);
    const { column } = props;
    const { name, hidden, key } = column;

    return (
        <FormGroup check className="m-3">
            <Label check>
                <Input
                    type="checkbox"
                    checked={!hidden}
                    onChange={() => toggleColumn(key)}
                />
                {' '}
                {name}
            </Label>
        </FormGroup>
    );
};

const ColumnSelect = () => {
    const { columns } = useContext(SampleContext);
    if (!columns || !columns.existing) {
        return '';
    }
    const { existing } = columns;

    return (
        <Row>
            <Col>
                <h5> Hide/Show Columns: </h5>
                <Form inline>
                    {existing.map((c) => <Checkbox key={c.id} column={c} />)}
                </Form>
            </Col>
        </Row>
    );
};
export default ColumnSelect;
