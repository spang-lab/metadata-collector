/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useContext } from 'react';

import { Markdown } from '../../../util';
import { MarkdownContext } from '../MarkdownContext';

function MarkdownCell(props) {
    const { openModal } = useContext(MarkdownContext);
    const { cell } = props;
    const { data } = cell;
    const { value } = data;

    return (
        <td>
            <div
                style={{ minHeight: '35px' }}
                role="button"
                tabIndex={0}
                className="p-1 m-0 border rounded"
                onClick={() => openModal(cell)}
            >
                <Markdown
                    value={value}
                />
            </div>

        </td>
    );
}
export default MarkdownCell;
