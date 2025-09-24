import React, {
    useState,
    useCallback,
    useContext,
    useEffect,
    useMemo,
} from 'react';

import { useParams } from 'react-router-dom';

import { GlobalContext } from '../app/Context';

import { Loader } from '../util';

export const ProjectContext = React.createContext({});

export function ProjectState(props) {
    const { children } = props;
    const { api } = useContext(GlobalContext);
    const [project, setProject] = useState(null);
    const [userList, setUserList] = useState([]);
    const [history, setHistory] = useState([]);
    const [properties, setProperties] = useState([]);

    const { id } = useParams();

    const fetchProperties = useCallback(async () => api({
        path: '/api/v1/properties/list',
    }, (data) => setProperties(data)), [api]);

    const fetchProject = useCallback(async () => api({
        path: `/api/v1/project/${id}`,
    }, (data) => setProject(data)), [api, id]);

    const removeProject = useCallback(async () => api({
        path: `/api/v1/project/${id}/remove`,
        method: 'POST',
    }, () => {}), [api, id]);

    const fetchUserList = useCallback(async () => api({
        path: '/api/v1/user/list',
    }, (data) => setUserList(data)), [api]);

    const addProjectMember = useCallback(async (sub, permission) => api({
        path: `/api/v1/project/${id}/member/new`,
        sub,
        permission,
    }, () => fetchProject()), [api, id, fetchProject]);

    const removeProjectMember = useCallback(async (sub) => api({
        path: `/api/v1/project/${id}/member/remove`,
        sub,
    }, () => fetchProject()), [api, id, fetchProject]);

    const fetchHistory = useCallback(async () => api({
        path: `/api/v1/metadata/${id}/history`,
    }, (data) => setHistory(data)), [api, id]);

    const setProperty = useCallback(async (prop, v) => api({
        path: `/api/v1/metadata/${id}`,
        property: prop.key,
        value: v,
    }, () => fetchProject()), [id, api, fetchProject]);

    const deleteProperty = useCallback(async (prop) => api({
        path: `/api/v1/metadata/${id}/remove`,
        property: prop.key,
    }, () => fetchProject()), [id, api, fetchProject]);

    const hasPermission = useCallback((requested) => {
        const permissionOrder = ['admin', 'owner', 'write', 'read', 'none'];
        const rIdx = permissionOrder.indexOf(requested);
        const pIdx = permissionOrder.indexOf(project.permission);
        if (rIdx === -1 || pIdx === -1) {
            return false;
        }
        return pIdx <= rIdx;
    }, [project]);

    const uploadProject = useCallback(async (formData) => api({
        path: `/api/v1/project/${id}/upload/excel`,
        body: formData,
        isFileUpload: true,
    }, () => fetchProject()), [id, api, fetchProject]);

    useEffect(() => {
        fetchProject();
        fetchUserList();
        fetchProperties();
    }, [fetchProject, fetchUserList, fetchProperties]);

    const value = useMemo(() => ({
        history,
        fetchHistory,
        project,
        properties,
        removeProject,
        fetchProject,
        uploadProject,
        hasPermission,
        userList,
        addProjectMember,
        removeProjectMember,
        setProperty,
        deleteProperty,
    }), [history,
        fetchHistory,
        project,
        properties,
        fetchProject,
        uploadProject,
        hasPermission,
        userList,
        addProjectMember,
        removeProjectMember,
        setProperty,
        deleteProperty,
        removeProject,
    ]);

    if (!project) {
        return <Loader />;
    }

    return (
        <ProjectContext.Provider
            value={value}
        >
            {children}
        </ProjectContext.Provider>
    );
}
