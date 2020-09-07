import * as React from 'react';

export const Button: React.FC<{text: string, onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void}> = props => {
    const [currentHover, updateHover] = React.useState<boolean>(false);
    return <button onMouseOver={() => updateHover(true)} onMouseLeave={() => updateHover(false)} onClick={props.onClick} style={{
        border: 'none',
        background: currentHover ? '#2d4159' : '#3a4660',
        color: 'white',
        padding: '8px 16px',
        margin: '10px 0',
        borderRadius: '6px',
        fontSize: '20px',
        cursor: 'pointer',
        position: "relative"
    }}>
        {props.text}
        {props.children}
    </button>;
}