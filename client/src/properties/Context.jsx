import React, {
    useState,
    useContext,
    useEffect,
    useMemo,
    useCallback,
} from 'react';

import { GlobalContext } from '../app/Context';

export const PropertiesContext = React.createContext({});

export function PropertiesState(props) {
    const { children } = props;
    const { api } = useContext(GlobalContext);

    const [properties, setProperties] = useState([]);

    const fetchProperties = useCallback(async () => api({
        path: '/api/v1/properties/list',
    }, (data) => setProperties(data)), [api]);

    const addProperty = useCallback(async (property) => api({
        path: '/api/v1/properties/add',
        property,
    }, () => fetchProperties()), [api, fetchProperties]);

    const editProperty = useCallback(async (property) => api({
        path: '/api/v1/properties/edit',
        property,
    }, () => fetchProperties()), [api, fetchProperties]);

    const uploadProperties = useCallback(async (formData) => api({
        path: '/api/v1/properties/upload',
        body: formData,
        isFileUpload: true,
    }, () => fetchProperties()), [api, fetchProperties]);

    useEffect(() => {
        fetchProperties();
    }, [fetchProperties]);

    const value = useMemo(() => ({
        properties,
        addProperty,
        editProperty,
        uploadProperties,
    }), [properties, addProperty, editProperty, uploadProperties]);

    return (
        <PropertiesContext.Provider
            value={value}
        >
            {children}
        </PropertiesContext.Provider>
    );
}
