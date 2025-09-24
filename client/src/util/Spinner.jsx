import React from 'react';
import './spinner.css';

function Spinner() {
    return (
        <div className="lds-ring">
            <div />
            <div />
            <div />
            <div />
        </div>
    );
}
export default Spinner;
