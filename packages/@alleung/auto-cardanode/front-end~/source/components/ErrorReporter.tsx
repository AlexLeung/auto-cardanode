import * as React from 'react';
import { theme } from './theme';

export const ErrorReporter: React.FC<{text: string | undefined}> = props => {
    return props.text === undefined ? null : <div style={{
        padding: theme.field.padding,
        background: '#FFBABA',
        color: '#D8000C',
        borderRadius: theme.borderRadius,
        fontSize: theme.subtext.fontSize,
        textAlign: 'center'
    }}>
        {props.text}
    </div>
}