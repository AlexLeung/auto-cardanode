import * as React from 'react';

export const Title: React.FC<{text: string}> = props => {
    return (
        <h1>{props.text}</h1>
    )
}