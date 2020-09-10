import * as React from 'react';
import { FormInput } from './FormInput';
import { theme } from './theme';

export enum TextInputType {
    SingleLine = "SingleLine",
    Password = "Password",
    FreeForm = "FreeForm",
    Code = "Code"
}

export interface TextInputProps {
    label: string;
    type: TextInputType;
    onChange: (newText: string) => void
}

const standardStyle: React.CSSProperties = {
    background: "none",
    borderWidth: 1,
    borderColor: theme.primaryColor,
    borderRadius: theme.borderRadius,
    padding: theme.field.padding,
    fontSize: theme.field.fontSize,
    margin: '5px 0'
}

export const TextInput: React.FC<TextInputProps> = props => {

    function getInputField(inputType: TextInputType) {
        switch(inputType) {
            case TextInputType.SingleLine:
                return <input 
                    style={{...standardStyle}}
                    type="text" onChange={e => props.onChange(e.target.value)} 
                />
            case TextInputType.Password:
                return <input 
                    style={{...standardStyle}}
                    type="password" onChange={e => props.onChange(e.target.value)}
                />
            case TextInputType.FreeForm:
                return <textarea 
                    onChange={e => props.onChange(e.target.value)}
                />
            case TextInputType.Code:
                return <textarea />
        }
    }

    return <FormInput label={props.label}>
        { getInputField(props.type) }
    </FormInput>;
}