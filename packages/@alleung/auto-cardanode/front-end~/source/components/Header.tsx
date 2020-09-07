import * as React from 'react';
import { rpcClient } from '../rpc-client';
import { Button } from './buttons/Button';
import { Page } from './pages';
import { useStore } from './state';

export const Header: React.FC = () => {
    const [output, setOutput] = React.useState("");
    const updatePage = useStore(state => state.updatePage);

    return <div className="header" style={{
                display: 'flex',
                height: '75px',
                width: '100%',
                background: '#feffff',
                color: '#3a4660',
                justifyContent: 'space-evenly',
                alignItems: 'center'
            }}>
                <h1 onClick={() => updatePage(Page.Launch)} style={{cursor:'pointer'}}>Home</h1>
                <h1 onClick={() => updatePage(Page.CreateNewPool)} style={{cursor:'pointer'}}>Create Stake</h1>
                <h1 onClick={() => updatePage(Page.Dashboard)} style={{cursor:'pointer'}}>View Stakes</h1>
        </div>
    }

//not sure if needed. maybe future thing. thinking header that carries over other pages just with name of program