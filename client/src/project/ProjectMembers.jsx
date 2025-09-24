import React, { useContext, useState } from 'react';

import {
    Container,
    Row,
    Col,
    ListGroup,
    ListGroupItem,
    Form,
    FormGroup,
    Button,
    Input,
} from 'reactstrap';
import { Trash, Plus } from 'react-feather';

import { Typeahead } from 'react-bootstrap-typeahead';

import { ProjectContext } from './Context';
import { UserContext } from '../app/UserContext';

const getPermissionString = (permission) => {
    switch (permission) {
    case 'read':
        return 'Read only';
    case 'write':
        return 'Read/Write';
    case 'owner':
        return 'Owner';
    default:
        return '';
    }
};

function MemberItem(props) {
    const { sub, permission } = props;
    const { removeProjectMember } = useContext(ProjectContext);

    const onDelete = async () => {
        await removeProjectMember(sub);
    };

    return (
        <ListGroupItem>
            <Container fluid>
                <Row>
                    <Col className="border-right px-3">
                        {sub}
                    </Col>
                    <Col md={6} className="text-muted">
                        {getPermissionString(permission)}
                        <Button
                            onClick={onDelete}
                            size="sm"
                            hidden={permission === 'owner'}
                            color="danger"
                            className="float-end"
                        >
                            <Trash size="12" />
                        </Button>

                    </Col>
                </Row>
            </Container>
        </ListGroupItem>
    );
}

function MemberList() {
    const { project } = useContext(ProjectContext);
    const { members } = project;
    return (
        <ListGroup>
            <MemberItem sub={project.owner} permission="owner" />
            {members.map((m) => (
                <MemberItem sub={m.sub} permission={m.permission} key={m.sub} />
            ))}
        </ListGroup>
    );
}

function MenuItem(props) {
    const { option } = props;
    return (
        <span>
            {option.sub}
            {' '}
            <small className="text-muted">
                {option.name}
            </small>
        </span>
    );
}

function MemberForm() {
    const {
        project,
        userList,
        addProjectMember,
        hasPermission,
    } = useContext(ProjectContext);
    const [permission, setPermission] = useState('write');
    const [memberSelection, setMemberSelection] = useState([]);

    if (!hasPermission('owner')) {
        return null;
    }

    const onSelect = (e) => {
        const { value } = e.target;
        setPermission(value);
    };
    const onSubmit = async (e) => {
        e.preventDefault();
        if (memberSelection.length !== 1) {
            return;
        }
        const { sub } = memberSelection[0];
        await addProjectMember(sub, permission);
        setMemberSelection([]);
        setPermission('write');
    };
    return (
        <Form className="m-3" onSubmit={onSubmit}>
            <FormGroup row>
                <Col>
                    <h5> Add a member </h5>
                    <Typeahead
                        autocomplete="off"
                        name="member"
                        onChange={setMemberSelection}
                        filterBy={['sub', 'name']}
                        id="user-select"
                        placeholder="Type a username..."
                        labelKey="sub"
                        minLength={2}
                        options={userList}
                        renderMenuItemChildren={(option) => (
                            <MenuItem key={option.sub} option={option} />
                        )}
                        selected={memberSelection}
                    />
                </Col>
            </FormGroup>
            <FormGroup row>
                <Col>
                    <Input
                        bsSize="sm"
                        onChange={onSelect}
                        name="permission"
                        type="select"
                        value={permission}
                    >
                        <option value="write"> Read/Write</option>
                        <option value="read"> Read only </option>
                    </Input>
                </Col>
                <Col>
                    <Button color="success" size="sm">
                        <Plus size="12" />
                        {' '}
                        Add Member
                    </Button>
                </Col>
            </FormGroup>
        </Form>
    );
}

function ProjectMembers() {
    return (
        <Container fluid>
            <Row>
                <Col>
                    <h4> Members: </h4>
                    <MemberList />
                </Col>
            </Row>
            <Row>
                <Col>
                    <hr />
                    <MemberForm />
                </Col>
            </Row>

        </Container>
    );
}
export default ProjectMembers;
