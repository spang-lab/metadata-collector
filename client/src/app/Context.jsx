import React, {
    useState,
    useRef,
    useEffect,
    useCallback,
    useMemo,
} from 'react';

import config from '../../../config/config.yaml';
import packageJson from '../../../package.json';

import { apiRequest } from '../util';

const clientConfig = config.client || {};
const { version } = packageJson;

export const GlobalContext = React.createContext({});

export function GlobalState(props) {
    const { children } = props;

    const [messages, setMessages] = useState([]);
    const messageRef = useRef(messages);
    messageRef.current = messages;

    const clearMessage = () => {
        const newMessages = messageRef.current.map((m) => ({ ...m }));
        newMessages.pop();
        setMessages(newMessages);
    };

    const showMessage = useCallback((text, bold = '', color = 'secondary') => {
        const genMessageId = () => {
            const num = Math.floor(Math.random() * 10000);
            return `message-${num}`;
        };
        const id = genMessageId();
        const message = {
            id,
            bold,
            text,
            color,
        };
        const newMessages = [message, ...messageRef.current];
        setMessages(newMessages);
        setTimeout(clearMessage, 7000);
    }, []);

    const api = useCallback(async (request, onSuccess) => {
        try {
            const { error, data } = await apiRequest(request);
            if (error) {
                showMessage(
                    error.toString(),
                    'An Error occured:',
                    'danger',
                );
                return;
            }
            onSuccess(data);
        } catch (err) {
            showMessage(
                err.toString(),
                'An Error occured:',
                'danger',
            );
        }
    }, [showMessage]);

    const value = useMemo(() => ({
        api,
        messages,
        clientConfig,
        version,
    }), [api, messages]);

    return (
        <GlobalContext.Provider
            value={value}
        >

            {children}
        </GlobalContext.Provider>
    );
}
