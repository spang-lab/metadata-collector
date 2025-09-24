import React, { useContext } from 'react';
import {
    Button,
} from 'reactstrap';
import { Plus } from 'react-feather';

import { SampleContext } from './Context';

function AddSample() {
    const { columns, addSample } = useContext(SampleContext);
    if (!columns) {
        return null;
    }
    const colSpan = columns.length + 2;

    return (
        <tr>
            <td colSpan={colSpan}>
                <Button
                    color="success"
                    className="m-1 px-5"
                    onClick={addSample}
                >
                    <Plus size="14" />
                    {' '}
                    Add a sample
                </Button>
            </td>
        </tr>
    );
}
export default AddSample;
