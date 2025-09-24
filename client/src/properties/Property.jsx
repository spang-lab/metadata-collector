import React, { useState, useContext } from 'react';

import {
    Col,
    Card,
    CardHeader,
    CardFooter,
    Input,
    FormGroup,
    Label,
    Button,
    Form,
} from 'reactstrap';

import { PropertiesContext } from './Context';
import { Spinner } from '../util';

function Property(props) {
    const { property } = props;
    const { editProperty } = useContext(PropertiesContext);
    const {
        key, type,
    } = property;

    const [data, setData] = useState(property.data);
    const [loading, setLoading] = useState(false);

    const setName = (name) => setData({ ...data, name });
    const setDescription = (d) => setData({ ...data, description: d });
    const setRegex = (r) => setData({ ...data, regex: r });

    const setSortPrioriry = (p) => setData({ ...data, sortPriority: p });
    const options = data.options || [];

    const deleteOption = (e, opt) => {
        e.preventDefault();
        const newOpts = options.filter((o) => o !== opt);
        setData({ ...data, options: newOpts });
    };
    const [option, setOption] = useState('');
    const addOption = (e) => {
        e.preventDefault();
        if (options.includes(option)) {
            return;
        }
        setData({ ...data, options: [...options, option] });
        setOption('');
    };
    const optionKeyPress = (e) => {
        const enterKeyCode = 13;
        if (e.keyCode === enterKeyCode) {
            addOption(e);
        }
    };

    let examples = data.examples || [];
    if (!Array.isArray(examples)) {
        examples = examples.valid;
        setData({ ...data, examples });
    }

    const [example, setExample] = useState('');
    const deleteExample = (ev, ex) => {
        ev.preventDefault();
        setData({ ...data, examples: examples.filter((e) => e !== ex) });
    };
    const addExample = (e) => {
        e.preventDefault();
        if (examples.includes(example)) {
            return;
        }
        setData({ ...data, examples: [...examples, example] });
        setExample('');
    };
    const exampleKeyPress = (e) => {
        const enterKeyCode = 13;
        if (e.keyCode === enterKeyCode) {
            addExample(e);
        }
    };

    const setFixed = (e) => {
        const fixed = e.target.checked;
        setData({ ...data, fixed });
    };

    let re = null;
    try {
        re = new RegExp(data.regex || '.*');
    } catch (err) {
        // regex is invalid
    }
    const getColor = (string) => {
        if (re && re.test(string)) {
            return 'success';
        }
        return 'danger';
    };

    const submit = async (e) => {
        e.preventDefault();
        setLoading(true);
        await editProperty({
            key,
            data,
        });
        setLoading(false);
    };

    return (
        <Col sm={{ size: 10, offset: 1 }}>
            <Card className="m-1">
                <Form onSubmit={submit}>
                    <CardHeader className="text-muted">
                        {type}
                        {' '}
                        property
                        <strong className="mx-3">
                            {key}
                        </strong>
                    </CardHeader>
                    <FormGroup row className="py-1">
                        <Label
                            className="p-2 ms-3"
                            size="lg"
                            sm="2"
                            for="name"
                        >
                            Name
                        </Label>
                        <Col sm="6">
                            <Input
                                bsSize="lg"
                                name="name"
                                onChange={(e) => setName(e.target.value)}
                                value={data.name}
                            />
                        </Col>
                    </FormGroup>
                    <FormGroup row className="py-1">
                        <Label
                            className="p-2 ms-3"
                            sm="2"
                            for="description"
                        >
                            Description
                        </Label>
                        <Col sm="6">
                            <Input
                                name="description"
                                type="textarea"
                                rows="3"
                                onChange={(e) => setDescription(e.target.value)}
                                value={data.description}
                            />
                        </Col>
                    </FormGroup>
                    <FormGroup row className="py-1">
                        <Label
                            className="p-2 ms-3"
                            sm="2"
                            for="sprio"
                        >
                            Sort Priority
                            <small> (higher first) </small>
                        </Label>
                        <Col sm="6">
                            <Input
                                name="sprio"
                                type="number"
                                onChange={(e) => setSortPrioriry(e.target.value)}
                                value={data.sortPriority}
                            />
                        </Col>
                    </FormGroup>
                    <FormGroup row className="py-1">
                        <Label
                            className="p-2 ms-3"
                            sm="2"
                            for="regex"
                        >
                            Regex
                        </Label>
                        <Col sm="6">
                            <Input
                                name="regex"
                                invalid={re === null}
                                onChange={(e) => setRegex(e.target.value)}
                                value={data.regex}
                            />
                        </Col>
                    </FormGroup>
                    <FormGroup row className="py-1">
                        <Label
                            className="p-2 ms-3"
                            sm="2"
                        >
                            Options
                            <small> (click to delete) </small>
                        </Label>
                        <Col sm="6">
                            {options
                                .sort()
                                .map((o) => (
                                    <Button
                                        onClick={(e) => deleteOption(e, o)}
                                        color={getColor(o)}
                                        outline
                                        key={o}
                                        className="m-1"
                                    >
                                        {o}
                                    </Button>
                                ))}
                        </Col>
                    </FormGroup>
                    <FormGroup row className="py-1">
                        <Label
                            className="p-2 ms-3"
                            sm="2"
                            for="option"
                        >
                            Add option
                        </Label>
                        <Col sm="4">
                            <Input
                                name="option"
                                onChange={(e) => setOption(e.target.value)}
                                onKeyDown={optionKeyPress}
                                value={option}
                                placeholder="Add option..."
                            />
                        </Col>
                        <Col sm="2">
                            <Button
                                disabled={!option}
                                onClick={(e) => addOption(e)}
                                className="m-1"
                                color="success"
                            >
                                Add
                            </Button>
                        </Col>
                    </FormGroup>
                    <FormGroup row className="py-1">
                        <Label
                            className="p-2 ms-3"
                            sm="2"
                        >
                            Examples
                            <small> (click to delete) </small>
                        </Label>
                        <Col sm="6">
                            {examples.map((ex) => (
                                <Button
                                    onClick={(e) => deleteExample(e, ex)}
                                    color={getColor(ex)}
                                    outline
                                    key={ex}
                                    className="m-1"
                                >
                                    {ex}
                                </Button>
                            ))}
                        </Col>
                    </FormGroup>
                    <FormGroup row className="py-1">
                        <Label
                            className="p-2 ms-3"
                            sm="2"
                            for="example"
                        >
                            Add example
                        </Label>
                        <Col sm="4">
                            <Input
                                name="example"
                                onChange={(e) => setExample(e.target.value)}
                                onKeyDown={exampleKeyPress}
                                value={example}
                                placeholder="Add example..."
                            />
                        </Col>
                        <Col sm="2">
                            <Button
                                disabled={!example}
                                onClick={(e) => addExample(e)}
                                className="m-1"
                                color="success"
                            >
                                Add
                            </Button>
                        </Col>
                    </FormGroup>
                    <FormGroup className="py-1">
                        <Label
                            sm="2"
                            className="p-2"
                        >
                            Fixed
                            <small> (cannot be deleted if checked) </small>
                        </Label>
                        <Input
                            className="m-1"
                            checked={!!data.fixed}
                            onChange={(e) => setFixed(e)}
                            type="checkbox"
                        />
                    </FormGroup>
                    <CardFooter className="text-end">
                        {(loading)
                            ? <Spinner />
                            : (
                                <Button
                                    color="success"
                                >
                                    Save
                                </Button>
                            )}
                    </CardFooter>
                </Form>
            </Card>
        </Col>
    );
}

export default Property;
