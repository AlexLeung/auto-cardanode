import * as React from 'react';
import { theme } from './theme';


export const FormInput: React.FC<{label:string}> = props => {
    return (
        <div>
            <div style={{color: "#999", fontSize: theme.subtext.fontSize, marginTop: 15}}>
                { props.label }
            </div>
            <div>
                { props.children }
            </div>
        </div>
    )
}