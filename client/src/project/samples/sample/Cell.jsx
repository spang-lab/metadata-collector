import React, { useContext, useState, useEffect } from 'react';

import { InputGroup, Button } from 'reactstrap';
import { Typeahead } from 'react-bootstrap-typeahead';
import { SampleContext } from '../Context';
import { validateProperty } from '../../../util';

import MarkdownCell from './MarkdownCell';

function Cell(props) {
  const { cell } = props;
  const {
    sample, column, data, type, values,
  } = cell;
  const { value } = data;

  const { editValue } = useContext(SampleContext);
  const [newValue, setValue] = useState(null);

  useEffect(() => {
    setValue(value);
  }, [value]);

  if (type === 'markdown') {
    return <MarkdownCell cell={cell} />;
  }

  const isValid = validateProperty(data, newValue);

  const submit = (selection) => {
    const [v] = selection;
    if (!v || !v.label) {
      return;
    }
    editValue(sample, column, v.label);
    setValue(v.label);
  };
  const clear = () => {
    editValue(sample, column, null);
    setValue(null);
  };

  const onBlur = () => {
    if (value === newValue) {
      return;
    }
    submit([{ label: newValue }]);
  };

  const options = values
    .sort()
    .map((v) => ({
      label: v,
    }));

  const selected = (newValue) ? [newValue] : [];

  const getButton = () => {
    if (!value) {
      return null;
    }
    return (
      <Button
        onClick={clear}
        size="sm"
        outline
      >
        x
      </Button>
    );
  };

  return (
    <td>
      <InputGroup>
        <Typeahead
          id="valueInput"
          paginate={false}
          newSelectionPrefix="New value: "
          isInvalid={isValid === false}
          selected={selected}
          options={options}
          onInputChange={(v) => { setValue(v); }}
          onBlur={onBlur}
          onChange={submit}
          filterBy={() => true}
        />
        {getButton()}
      </InputGroup>
    </td>
  );
}
export default Cell;
