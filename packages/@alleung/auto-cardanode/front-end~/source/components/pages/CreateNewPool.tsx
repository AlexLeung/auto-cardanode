import * as React from 'react';
import { Button } from '../buttons/Button';
import { Page } from '../../model/pages';
import { useStore } from '../../model/state';
import { CenterVeritcalAndHorizontal } from '../layouts/CenterVertAndHoriz';
import { CenterHorizontal } from '../layouts/CenterHoriz';
import { SignedInPage } from './templates/SignedInPage';
import { Title } from '../Title';
import { FormInput } from '../FormInput';
import { TextInput, TextInputType } from '../TextInput';

export enum NetworkType {
    MainNet = "MainNet",
    TestNet = "TestNet"
}

export const CreateNewPool: React.FC = ( ) => {
    const updatePage = useStore(state => state.updatePage);
    // https://docs.cardano.org/projects/cardano-node/en/latest/stake-pool-operations/register_stakepool.html
    // Seems like the following are user generated: name, description, ticker, homepage, pool-pledge, pool-cost, pool-margin, cloud provider API credentials
    // While the following can be pool generated: 
    const [network, setNetwork] = React.useState(NetworkType.MainNet);
    const [name, setName] = React.useState("");
    const [ticker, setTicker] = React.useState("");
    const [description, setDescription] = React.useState("");
    const [websiteURL, setWebsiteURL] = React.useState("");
    const [pledge, setPledge] = React.useState("");
    const [cost, setCost] = React.useState("");
    const [margin, setMargin] = React.useState("");

    return <SignedInPage>
        <CenterVeritcalAndHorizontal>
            <Title text="Create New Stake Pool" />
            <FormInput label="Network">
                <select value={network} onChange={e => setNetwork(e.target.value as NetworkType)}>
                    <option value={NetworkType.MainNet}>Shelley Main Net</option>
                    <option value={NetworkType.TestNet}>Shelley Test Net</option>
                </select>
            </FormInput>
            <TextInput label="Stake Pool Name" onChange={setName} type={TextInputType.SingleLine} />
            <TextInput label="Stake Pool Ticker" onChange={setTicker} type={TextInputType.SingleLine} />
            <TextInput label="Stake Pool Website URL" onChange={setWebsiteURL} type={TextInputType.SingleLine} />
            <TextInput label="Stake Pool Description" onChange={setDescription} type={TextInputType.FreeForm} />

            <TextInput label="Stake Pool Pledge" onChange={setPledge} type={TextInputType.SingleLine} />
            <TextInput label="Stake Pool Cost" onChange={setCost} type={TextInputType.SingleLine} />
            <TextInput label="Stake Pool Margin" onChange={setMargin} type={TextInputType.SingleLine} />

            <CenterHorizontal width={300}>
                <Button text="Back" onClick={() => updatePage(Page.Dashboard)} />
                <Button text="Create" onClick={() => updatePage(Page.MasterPassword)} />
            </CenterHorizontal>
        </CenterVeritcalAndHorizontal>
    </SignedInPage>
}