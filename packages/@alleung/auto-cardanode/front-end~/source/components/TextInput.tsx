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
    value?: string;
    initialValue?: string;
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
    const [value, setValue] = React.useState(props.value ?? props.initialValue ?? "");

    const definitiveValue = props.value ?? value;

    function onUpdate(e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) {
        const targetValue = e.target.value;
        props.onChange(targetValue);
        setValue(targetValue);
    }

    function getInputField(inputType: TextInputType) {
        switch(inputType) {
            case TextInputType.SingleLine:
                return <input 
                    style={{...standardStyle}}
                    type="text" onChange={onUpdate}
                    value={definitiveValue}
                />
            case TextInputType.Password:
                return <input 
                    style={{...standardStyle}}
                    type="password" onChange={onUpdate}
                    value={definitiveValue}
                />
            case TextInputType.FreeForm:
                return <textarea 
                    onChange={onUpdate}
                    value={definitiveValue}
                />
            case TextInputType.Code:
                return <textarea
                    onChange={onUpdate}
                    value={definitiveValue}
                    style={{
                        ...standardStyle,
                        fontSize: 14,
                        fontFamily: 'monospace',
                        height: 400,
                        width: 300
                    }}
                />
        }
    }

    return <FormInput label={props.label}>
        { getInputField(props.type) }
    </FormInput>;
}