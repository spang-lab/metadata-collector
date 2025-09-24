import React, {
    useState,
    useContext,
    useEffect,
    useMemo,
} from 'react';

import { GlobalContext } from './Context';

export const UserContext = React.createContext({});

export function UserState(props) {
    const { children } = props;
    const [user, setUser] = useState(null);
    const { api } = useContext(GlobalContext);

    useEffect(() => {
        const fetchUser = async () => api({
            path: '/api/v1/user/me',
        }, (data) => setUser(data));
        fetchUser();
    }, [api]);

    const value = useMemo(() => (user), [user]);

    return (
        <UserContext.Provider
            value={value}
        >

            {children}
        </UserContext.Provider>
    );
}
