import React, { useRef } from 'react';

import {
    UncontrolledTooltip,
} from 'reactstrap';

import { Info } from 'react-feather';
import { formatDate } from './strings';

export function InfoButton(props) {
    const { message } = props;

    const badgeRef = useRef();
    return (
        <>
            <span
                className="px-2 py-1 m-1 text-primary"
                ref={badgeRef}
            >
                <Info size="18" />
            </span>
            <UncontrolledTooltip target={badgeRef}>
                {message}
            </UncontrolledTooltip>
        </>
    );
}

export function LastEdited(props) {
    const { property } = props;
    const { owner, timestamp } = property;
    const message = `
        Last edited by ${owner}
        on ${formatDate(timestamp)}
    `;
    return <InfoButton message={message} />;
}
