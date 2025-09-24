import React, { useRef } from 'react';

import {
    ListGroupItem,
    ListGroupItemHeading,
    ListGroupItemText,
} from 'reactstrap';

function Property(props) {
    const {
        property, selected, onSelect, onDoubleClick,
    } = props;
    const timerRef = useRef();
    if (!property || !property.data) {
        return '';
    }
    const { key, data } = property;
    const { name, description } = data;

    const onClick = (e) => {
        clearTimeout(timerRef.current);
        if (e.detail === 1) {
            timerRef.current = setTimeout(() => onSelect(property), 200);
        } else if (e.detail === 2) {
            onDoubleClick(property);
        }
    };

    return (
        <ListGroupItem
            active={selected}
            onClick={onClick}
        >
            <ListGroupItemHeading>
                {name}
                <small className="px-3">
                    {key}
                </small>
            </ListGroupItemHeading>
            <ListGroupItemText>
                {description}
            </ListGroupItemText>
        </ListGroupItem>
    );
}

export default Property;
