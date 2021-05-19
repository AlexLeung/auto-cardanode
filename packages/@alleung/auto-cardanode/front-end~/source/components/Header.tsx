import * as React from 'react';

export const Header: React.FC<{left: React.ReactNode, right: React.ReactNode}> = props => {
    return <div className="header" style={{
                display: 'flex',
                height: '75px',
                width: '100%',
                padding: '0 10px',
                background: '#eee',
                justifyContent: 'space-between',
                alignItems: 'center',
                boxSizing: 'border-box'
            }}>
                <div>
                    {props.left}
                </div>
                <div>
                    {props.right}
                </div>
        </div>
    }