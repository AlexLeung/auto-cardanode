import * as React from 'react'
import { rpcClient } from '../rpc-client';
import { Button } from './buttons/Button';
import { Page } from './pages';
import { useStore } from './state';
import { Header } from './Header';

export const Dashboard: React.FC = () => {
    const [output, setOutput] = React.useState("");
    const updatePage = useStore(state => state.updatePage);
    return <div>
        <div className="dashboard">
            <div>
                dashboard to view all stakes
            </div>
            <Button text="Sign Out" onClick={() => updatePage(Page.Launch)} />
        </div>
    </div>
}