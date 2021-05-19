import * as React from 'react';


export const CenterVeritcalAndHorizontal: React.FC = props => {
    return <div style={{
        height: '100%',
        position: 'relative',
        display: 'flex',
        flexDirection:'column',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#3a4660'
    }}>
        {props.children}
    </div>
}