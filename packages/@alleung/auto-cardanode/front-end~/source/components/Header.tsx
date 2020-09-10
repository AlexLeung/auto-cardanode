import * as React from 'react';
import { Button } from './buttons/Button';
import { Page } from '../model/pages';
import { useStore } from '../model/state';

export const Header: React.FC = () => {
    const updatePage = useStore(state => state.updatePage);

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
                <div></div>
                <Button text="Sign Out" onClick={() => updatePage(Page.Launch)} /> 
        </div>
    }