import * as React from 'react';
import { Button } from '../buttons/Button';
import { Page } from '../../model/pages';
import { useStore } from '../../model/state';
import { CenterContent } from '../layouts/CenterContent';
import { CenterInlineContent } from '../layouts/CenterInlineContent';
import { SignedInPage } from './templates/SignedInPage';
import { Title } from '../Title';
import { FormInput } from '../FormInput';
import { TextInput, TextInputType } from '../TextInput';
import { theme } from '../theme';


// export interface IStakePool {
//     _id: string;
//     name: string;
//     ticker: string;
//     desc: string;
//     pledge: number;
//     websiteURL: string;
//     password: string;
//     poolPledge: string;
//     poolCost: string;
//     poolMargin: string;
//     status: boolean
//     createdAt?: string
//     updatedAt?: string
// }
// export interface IStakePoolProps {
//     pool: IStakePool;
// }
// export type ApiDataType = {
//     message: string;
//     status: string;
//     stakePools: IStakePool[];
//     stakePool?: IStakePool;
// }
// */

export enum NetworkType {
    MainNet = "MainNet",
    TestNet = "TestNet"
}

export enum InfrastructureProvider {
    GoogleCloud = "GoogleCloud",
    AWS = "AWS",
    Azure = "Azure",
    OwnInstance = "OwnInstance"
}

interface InfrastructureProviderMtaData {
    implemented: boolean;
    logoURL: string;
    description: string;
}

const InfrastructureProviderInfo: {[IP in InfrastructureProvider]: InfrastructureProviderMtaData} = {
    [InfrastructureProvider.AWS]: {
        implemented: false,
        logoURL: "https://assets.cloud.im/prod/ux1/images/logos/aws/aws-2x.png",
        description: "EKS on AWS"
    },
    [InfrastructureProvider.Azure]: {
        implemented: false,
        logoURL: "https://dtb5pzswcit1e.cloudfront.net/assets/images/product_logos/icon_microsoft_azure_open_service_broker@2x.png",
        description: "AKS on Azure"
    },
    [InfrastructureProvider.GoogleCloud]: {
        implemented: true,
        logoURL: "https://res-1.cloudinary.com/crunchbase-production/image/upload/c_lpad,h_256,w_256,f_auto,q_auto:eco/i6f25wkhuwvkcgg4jcux",
        description: "GKE on GCP"
    },
    [InfrastructureProvider.OwnInstance]: {
        implemented: false,
        logoURL: "https://res-1.cloudinary.com/crunchbase-production/image/upload/c_lpad,h_256,w_256,f_auto,q_auto:eco/s8jc0hzid80bl69jsrxq",
        description: "Use your own K8s"
    }
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
    const [infraProvider, setInfraProvider] = React.useState(InfrastructureProvider.GoogleCloud);
    const [infraKey, setInfraKey] = React.useState("");

    return <SignedInPage>
        <CenterContent>
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

            <FormInput label="">
                <CenterInlineContent>
                {
                    (Object.keys(InfrastructureProvider) as InfrastructureProvider[]).map((provider, index) => {
                        const info = InfrastructureProviderInfo[provider];
                        const unavailable = !info.implemented;
                        const selected = provider === infraProvider;
                        return <div key={index} style={{
                            position: 'relative',
                            cursor: unavailable ? 'default' : 'pointer',
                            margin: '0 20px',
                            width: 150,
                            border: selected ? `1px solid ${theme.primaryColor}` : 'none',
                            borderRadius: theme.borderRadius
                        }} onClick={e => {if(!unavailable) setInfraProvider(provider);}}>
                            {unavailable && <div 
                                style={{
                                    background: 'rgba(255,255,255,.85)',
                                    color: theme.primaryColor,
                                    fontSize: 15,
                                    position: 'absolute',
                                    height: '100%',
                                    width: '100%',
                                    top: 0,
                                    left: 0,
                                    zIndex: 1,
                                    borderRadius: 5
                                }}
                            >
                                <div style={{marginTop:35, width: '100%', textAlign:'center'}}>Coming Soon!</div>
                            </div>}
                            <CenterContent>
                                <img style={{display:'block'}} width={90} src={info.logoURL} />
                                <p>
                                    {info.description}
                                </p>
                            </CenterContent>
                        </div>
                    })
                }
                </CenterInlineContent>
            </FormInput>
            <TextInput label="Infrastructure Provider Keys" onChange={setInfraKey} type={TextInputType.Code} />

            <CenterInlineContent width={300}>
                <Button text="Back" onClick={() => updatePage(Page.Dashboard)} />
                <Button text="Create" onClick={() => updatePage(Page.MasterPassword)} />
            </CenterInlineContent>
        </CenterContent>
    </SignedInPage>
}