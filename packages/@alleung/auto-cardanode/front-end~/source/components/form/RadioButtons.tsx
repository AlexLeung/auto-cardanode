import * as React from 'react';
import { FormInput } from '../FormInput';

export interface RadioButtonsProps<T extends string> {
    selectionLabel: string;
    initial: T;
    labels: {[option in T]: string};
    onChange: (selected: T) => void;
}

export function RadioButtons<T extends string>(props: React.PropsWithChildren<RadioButtonsProps<T>>) {
    const [currentValue, setValue] = React.useState(props.initial);
    return (
        <FormInput label={props.selectionLabel}>
            {
                Object.entries(props.labels).map(([value, label]) => <div>
                    <input type="radio" value={value} checked={currentValue === value} onChange={e => {setValue(value as T); props.onChange(value as T)}} />
                    {label}
                </div>)
            }
        </FormInput>
    )
}