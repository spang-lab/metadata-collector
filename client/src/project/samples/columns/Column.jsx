import React, { useContext } from 'react';

import { Trash } from 'react-feather';
import { Button } from 'reactstrap';
import { SampleContext } from '../Context';

import { InfoButton } from '../../../util';

function Column(props) {
    const { column } = props;
    const { removeColumn } = useContext(SampleContext);
    const {
        key, name, size, description, fixed,
    } = column;

    const width = Math.round(size * 6.7) + 120;
    const style = {
        minWidth: `${width}px`,
    };

    const deleteButton = () => {
        if (fixed) {
            return null;
        }
        return (
            <Button
                size="sm"
                color="danger"
                outline
                onClick={() => removeColumn(key)}
            >
                <Trash size="14" />
            </Button>
        );
    };

    return (
        <th className="text-center" style={style}>
            {name}
            <br />
            <InfoButton message={description} />
            {deleteButton()}
        </th>
    );
}

export default Column;
