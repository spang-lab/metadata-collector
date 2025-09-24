import React, { useContext, useState, useEffect } from 'react';

import { Typeahead, Fragment } from 'react-bootstrap-typeahead';
import { Trash } from 'react-feather';
import { Col, Button, InputGroup } from 'reactstrap';
import { validateProperty } from '../../util';

import { ProjectContext } from '../Context';

import MarkdownCell from './MarkdownCell';

function Cell(props) {
    const { property } = props;
    const { setProperty } = useContext(ProjectContext);

    const { value, data } = property;
    const { options, type } = data;

    const [newValue, setValue] = useState(null);
    useEffect(() => {
        setValue(value);
    }, [value]);

    if (type === 'markdown') {
        return (
            <MarkdownCell property={property} />
        );
    }

    const isValid = validateProperty(data, newValue);

    const submit = (selection) => {
        const [v] = selection;
        if (!v) {
            return;
        }
        setValue(v);
        setProperty(property, v);
    };
    const clear = () => {
        setValue('');
        setProperty(property, '');
    };

    const onBlur = () => {
        if (value === newValue) {
            return;
        }
        submit([newValue]);
    };

    const deleteProperty = () => {
        setProperty(property, null);
    };
    let toptions = [];
    if (options) {
        toptions = options.sort();
    }
    const selected = (newValue) ? [newValue] : [];

    const getButton = () => {
        if (!value) {
            return null;
        }
        return (
            <Button
                onClick={clear}
                size="sm"
                outline
            >
                x
            </Button>
        );
    };

    return (
        <Col md={9}>
            <InputGroup>
                <Typeahead
                    id="valueInput"
                    paginate={false}
                    newSelectionPrefix="New value: "
                    isInvalid={isValid === false}
                    selected={selected}
                    options={toptions}
                    onInputChange={(v) => setValue(v)}
                    onBlur={onBlur}
                    onChange={submit}
                    filterBy={() => true}
                />
                {getButton()}
            </InputGroup>
        </Col>
    );
}
export default Cell;
