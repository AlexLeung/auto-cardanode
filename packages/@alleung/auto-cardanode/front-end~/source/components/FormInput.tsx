import * as React from 'react';


export const FormInput: React.FC<{label:string}> = props => {
    return (
        <div>
            <div style={{color: "#999", fontSize: 17, marginTop: 15}}>
                { props.label }
            </div>
            <div>
                { props.children }
            </div>
        </div>
    )
}