import React, {
  useState,
  useContext,
  useEffect,
  useCallback,
  useMemo,
} from 'react';

import { useParams } from 'react-router-dom';

import { GlobalContext } from '../../app/Context';
import { ProjectContext } from '../Context';

export const SampleContext = React.createContext({});

export function SampleState(props) {
  const { children } = props;
  const { project } = useContext(ProjectContext);
  const { api } = useContext(GlobalContext);

  const [sampleMatrix, setSampleMatrix] = useState({
    samples: [],
    columns: [],
    current: 0,
    limit: 25,
  });
  const [pagination, setPagination] = useState({
    current: 0,
    limit: 25,
    total: 0,
  });

  const [visibleSamples, setVisibleSamples] = useState([]);

  useEffect(() => {
    const sampleCount = sampleMatrix.samples.length;
    setPagination((p) => ({
      ...p,
      total: sampleCount,
    }));
  }, [sampleMatrix.samples]);

  useEffect(() => {
    const { current, limit } = pagination;
    const visible = sampleMatrix.samples.slice(current, current + limit);
    setVisibleSamples(visible);
  }, [pagination, sampleMatrix.samples]);

  const { samples, columns } = sampleMatrix;

  const { id } = useParams();

  const fetchMatrix = useCallback(async () => api({
    path: '/api/v1/sample/matrix',
    entityId: id,
  }, (data) => setSampleMatrix(data)), [api, id]);

  const addColumn = useCallback(async (prop) => api({
    path: `/api/v1/project/${id}/column/add`,
    property: prop,
  }, () => fetchMatrix()), [api, id, fetchMatrix]);

  const removeColumn = useCallback(async (prop) => api({
    path: `/api/v1/project/${id}/column/remove`,
    property: prop,
  }, () => fetchMatrix()), [api, fetchMatrix, id]);

  const addSample = useCallback(async () => api({
    path: '/api/v1/sample/add',
    entityId: id,
  }, () => fetchMatrix()), [id, api, fetchMatrix]);

  const editValue = useCallback(async (sampleId, property, value) => {
    if (!value) {
      api({
        path: `/api/v1/metadata/${sampleId}/remove`,
        property,
      }, () => fetchMatrix());
    } else {
      api({
        path: `/api/v1/metadata/${sampleId}`,
        property,
        value,
      }, () => fetchMatrix());
    }
  }, [api, fetchMatrix]);

  useEffect(() => {
    fetchMatrix();
  }, [project, fetchMatrix]);

  const value = useMemo(() => ({
    samples: visibleSamples,
    columns,
    addColumn,
    removeColumn,
    addSample,
    editValue,
  }), [
    visibleSamples,
    columns,
    addColumn,
    removeColumn,
    addSample,
    editValue,
  ]);

  return (
    <SampleContext.Provider
      value={value}
    >
      {children}
    </SampleContext.Provider>
  );
}
