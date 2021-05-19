import * as React from 'react';


export const CenterHorizontal: React.FC<{width?: number | string, justifyContent?: React.CSSProperties['justifyContent']}> = props => {
    return <div style={{
        width: props.width ?? '100%',
        paddingTop:'5px',
        display: 'flex',
        justifyContent: props.justifyContent ?? 'space-around',
        alignItems: 'center',
        color: '#3a4660'
    }}>
        {props.children}
    </div>
}