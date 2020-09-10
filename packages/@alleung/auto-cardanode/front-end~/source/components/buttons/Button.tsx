import * as React from 'react';
import { theme } from '../theme';

export interface ButtonProps {
    text: string;
    disabled?: boolean;
    onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

export const Button: React.FC<ButtonProps> = props => {
    const [currentHover, updateHover] = React.useState<boolean>(false);

    const background = props.disabled ? '#999' :
        currentHover ? theme.primaryColorOnFocus : theme.primaryColor

    return <button 
        onMouseOver={() => updateHover(true)}
        onMouseLeave={() => updateHover(false)}
        onClick={e => {
            if (!props.disabled && props.onClick)  {
                props.onClick(e);
            }
        }}
        style={{
            border: 'none',
            background,
            color: theme.primaryColorContrast,
            padding: theme.field.padding,
            margin: '10px 0',
            borderRadius: theme.borderRadius,
            fontSize: theme.field.fontSize,
            cursor: props.disabled ? 'default' : 'pointer',
            position: "relative"
        }}
    >
        {props.text}
        {props.children}
    </button>;
}