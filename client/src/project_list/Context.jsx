import React, {
    useState, useMemo, useContext, useEffect, useCallback,
} from 'react';
import { GlobalContext } from '../app/Context';

export const ProjectListContext = React.createContext({});

export function ProjectListState(props) {
    const { children } = props;
    const { api } = useContext(GlobalContext);

    const [projects, setProjects] = useState([]);
    const [templates, setTemplates] = useState([]);

    const fetchProjects = useCallback(async () => api({
        path: '/api/v1/project/list',
    }, (data) => setProjects(data)), [api]);

    const addProject = useCallback(async (data) => api({
        path: '/api/v1/project/new',
        ...data,
    }, fetchProjects), [api, fetchProjects]);

    const fetchTemplates = useCallback(async () => api({
        path: '/api/v1/template/list',
    }, (data) => setTemplates(data)), [api]);

    useEffect(() => {
        fetchProjects();
        fetchTemplates();
    }, [fetchProjects, fetchTemplates]);

    const value = useMemo(() => ({
        templates,
        projects,
        addProject,
    }), [projects, templates, addProject]);

    return (
        <ProjectListContext.Provider
            value={value}
        >

            {children}
        </ProjectListContext.Provider>
    );
}
