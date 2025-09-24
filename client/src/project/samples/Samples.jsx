/* global window */
import React, { useRef, useState } from 'react';

import {
  Container,
  Row,
  Col,
  Button,
} from 'reactstrap';
import { ChevronRight, ChevronLeft } from 'react-feather';

import { SampleState } from './Context';
import SampleTable from './SampleTable';

const easeInOutQuad = (time, b, c, d) => {
  let t = time / (d / 2);
  if (t < 1) return (c / 2) * t * t + b;
  t -= 1;
  return -(c / 2) * (t * (t - 2) - 1) + b;
};

function SampleMatrix() {
  const scrollRef = useRef();

  let scrollDelta = 0;
  const duration = 500;
  let start = null;

  const scrollStep = (timestamp) => {
    const elem = scrollRef.current;
    if (!elem) {
      return;
    }
    if (!start) {
      start = timestamp;
    }
    const elapsed = timestamp - start;
    const startX = elem.scrollLeft;
    const max = elem.scrollWidth - elem.clientWidth;

    const v = easeInOutQuad(elapsed, startX, scrollDelta, duration);
    elem.scrollLeft = v;
    if (elapsed < duration && v >= 0 && v <= max) {
      window.requestAnimationFrame(scrollStep);
    } else {
      scrollDelta = 0;
    }
  };

  const scroll = (delta) => {
    start = null;
    scrollDelta += delta;
    window.requestAnimationFrame(scrollStep);
  };

  return (
    <SampleState>
      <Container fluid>
        <Row>
          <Col>
            <h2 className="pt-3">
              Samples
            </h2>
            <hr />
          </Col>
          <Col md={3} className="pt-5">
            <Button
              outline
              className="pb-0 m-1"
              onClick={() => scroll(-100)}
            >
              <ChevronLeft size="40" />
            </Button>
            <Button
              outline
              className="pb-0 m-1"
              onClick={() => scroll(100)}
            >
              <ChevronRight size="40" />
            </Button>
          </Col>

        </Row>
        <div
          ref={scrollRef}
          style={{
            overflowX: 'scroll',
            scrollBehavior: 'smooth',
            minHeight: '600px',
          }}
        >

          <Row>
            <Col>
              <SampleTable />
            </Col>
          </Row>
        </div>
      </Container>
    </SampleState>
  );
}
export default SampleMatrix;
