import React, { useContext } from 'react';

import {
  Container,
  Row,
  Col,
  Table,
} from 'reactstrap';

import { SampleContext } from './Context';

import AddSample from './AddSample';
import Columns from './columns/Columns';
import Sample from './sample/Sample';
import ColumnSelect from './ColumnSelect';

import { MarkdownState } from './MarkdownContext';

function SampleTable() {
  const { samples } = useContext(SampleContext);
  return (
    <Container fluid>
      <ColumnSelect />
      <Row>
        <Col>
          <Table>
            <Columns />
            <tbody>
              <MarkdownState>
                {samples.map((s) => <Sample key={s.id} sample={s} />)}
              </MarkdownState>
              <AddSample />
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
}
export default SampleTable;
