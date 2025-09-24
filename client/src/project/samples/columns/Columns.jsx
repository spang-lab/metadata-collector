import React, { useContext } from 'react';

import { SampleContext } from '../Context';

import Column from './Column';
import AddColumn from './AddColumn';

function Columns() {
    const { columns } = useContext(SampleContext);
    return (
        <thead>
            <tr>
                <th> ID </th>
                <th> Created by </th>
                {columns.map((p) => (<Column key={p.key} column={p} />))}
                <th>
                    <AddColumn />
                </th>
            </tr>
        </thead>
    );
}
export default Columns;
