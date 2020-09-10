import * as React from 'react'
import { rpcClient } from '../../rpc-client';
import { Button } from '../buttons/Button';
import { Page } from '../../model/pages';
import { useStore } from '../../model/state';
import { Title } from '../Title';
import { SignedInPage } from './templates/SignedInPage';


export const Dashboard: React.FC = () => {
    const [showMainNet, setShowMainNet] = React.useState<boolean>(true);
    const [showTestNet, setShowTestNet] = React.useState<boolean>(false);
    const updatePage = useStore(state => state.updatePage);
    return <SignedInPage>
        <Title text="Stake Pools" />
        <Button text="Create New Stake Pool" onClick={() => updatePage(Page.CreateNewPool)} />
        <div>
            <span style={{margin:'0 20px'}}>
                Main Net <input type="checkbox" checked={showMainNet} onChange={e => setShowMainNet(e.target.checked)} />
            </span>
            <span>
                Test Net <input type="checkbox" checked={showTestNet} onChange={e => setShowTestNet(e.target.checked)} />
            </span>
        </div>
        {/* TODO: list all stake pools here */}
    </SignedInPage>
}