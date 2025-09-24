import React from 'react';
import { QRCode } from '../../../util';

import Cell from './Cell';

function Sample(props) {
    const { sample } = props;
    const { id, owner, cells } = sample;

    return (
        <tr>
            <td>
                <QRCode id={id} />
            </td>
            <td>
                {owner}
            </td>
            {cells.map((c) => <Cell key={c.column} cell={c} />)}

        </tr>
    );
}
export default Sample;
