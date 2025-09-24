/* eslint-disable react/no-danger */
import React from 'react';

import { marked } from 'marked';
import DOMPurify from 'dompurify';

function Markdown(props) {
    const { value } = props;
    if (!value) {
        return (
            <div />
        );
    }
    let sanitized = '';
    try {
        const html = marked.parse(value);
        sanitized = DOMPurify.sanitize(html);
    } catch (error) {
        sanitized = 'Error: invalid markdown';
    }

    return (
        <div dangerouslySetInnerHTML={{ __html: sanitized }} />
    );
}
export default Markdown;
