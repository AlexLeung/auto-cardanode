import { InfrastructureProvider } from '@alleung/auto-cardanode-common';
import * as React from 'react';
import { Page } from '../../model/pages';
import { projectMetadata } from '../../model/project-meta';
import { useStore } from '../../model/state';
import { Button } from '../buttons/Button';
import { FileUploadSubmitButton } from '../buttons/FileUploadButton';
import { FormInput } from '../FormInput';
import { RegisterGCPForm } from '../infrastructure-register/RegisterGCPForm';
import { CenterHorizontal } from '../layouts/CenterHoriz';
import { CenterVeritcalAndHorizontal } from '../layouts/CenterVertAndHoriz';
import { TextInput, TextInputType } from '../TextInput';
import { theme } from '../theme';
import { Title } from '../Title';
import { SignedInPage } from './templates/SignedInPage';

interface InfrastructureProviderMtaData {
    implemented: boolean;
    logoURL: string;
    description: string;
    keyLabel: string;
    details: string;
}

const InfrastructureProviderInfo: {[IP in InfrastructureProvider]: InfrastructureProviderMtaData} = {
    [InfrastructureProvider.AWS]: {
        implemented: false,
        logoURL: "https://assets.cloud.im/prod/ux1/images/logos/aws/aws-2x.png",
        description: "EKS on AWS",
        keyLabel: "IAM role key?",
        details: "When registering with AWS, we will create a new AWS account which will house all of the resources for all of your pools."
    },
    [InfrastructureProvider.Azure]: {
        implemented: false,
        logoURL: "https://dtb5pzswcit1e.cloudfront.net/assets/images/product_logos/icon_microsoft_azure_open_service_broker@2x.png",
        description: "AKS on Azure",
        keyLabel: "Some weird Azure keyfile?",
        details: "I don't really understand Azure that well yet..."
    },
    [InfrastructureProvider.GoogleCloud]: {
        implemented: true,
        logoURL: "https://res-1.cloudinary.com/crunchbase-production/image/upload/c_lpad,h_256,w_256,f_auto,q_auto:eco/i6f25wkhuwvkcgg4jcux",
        description: "GKE on GCP",
        keyLabel: "Service Account Key JSON",
        details: `When registering with Google Cloud Platform (GCP), ${projectMetadata.name} will create a Project with the name '${projectMetadata.infraPrefix}'.
        If your Google account already has access to a projectal with this name, the tool will use that existing Project. Once this is done, the tool will pause until billing has been set up for the project. Once this is done,
        ${projectMetadata.name} will create a Service Account named ${projectMetadata.infraPrefix} with the IAM Role 'Owner', and will save the API credentials for this
        Service Account to the key file meaning you no longer need to sign in to Google for the tool to update the infrastructure, just have the ${projectMetadata.name}
        keyfile present. TODO: elaborate on resources used and expected cost.`
    },
    [InfrastructureProvider.OwnInstance]: {
        implemented: false,
        logoURL: "https://res-1.cloudinary.com/crunchbase-production/image/upload/c_lpad,h_256,w_256,f_auto,q_auto:eco/s8jc0hzid80bl69jsrxq",
        description: "Use your own K8s",
        keyLabel: "SSH keyfile?",
        details: `Somehow you're going to provide your own instances and register them. Maybe a list of SSH keys????`
    }
}

const InfrastructureOption: React.FC<{provider: InfrastructureProvider, selected: boolean, onClick: () => void}> = props => {
    const [isHoveredOver, setHover] = React.useState(false);
    const info = InfrastructureProviderInfo[props.provider];
    const isImplemented = info.implemented;
    return (
        <div style={{
            position: 'relative',
            cursor: isImplemented && !props.selected ? 'pointer' : 'default',
            margin: '0 20px',
            width: 150,
            border: '1px solid',
            borderColor: props.selected ? `${theme.primaryColor}` : 'rgba(0,0,0,0)',
            borderRadius: theme.borderRadius,
            background: isHoveredOver && isImplemented || props.selected ? 'rgb(235,235,235)' : 'none'
        }} 
        onMouseMove={e => setHover(true)}
        onMouseOut={e => setHover(false)}
        onClick={e => {if(isImplemented) props.onClick()}}>
            {!isImplemented && <div 
                style={{
                    background: 'rgba(255,255,255,.65)',
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
                <div style={{marginTop:30, width: '100%', textAlign:'center', fontWeight: 'bold', padding: 5, position: 'relative', backdropFilter: 'blur(2px)'}}>
                    Coming Soon!
                </div>
            </div>}
            <CenterVeritcalAndHorizontal>
                <img style={{display:'block'}} width={90} src={info.logoURL} />
                <p>
                    {info.description}
                </p>
            </CenterVeritcalAndHorizontal>
        </div>
    )
}

export const RegisterInfrastructure: React.FC = () => {
    const updatePage = useStore(state => state.updatePage);
    const [infraProvider, setInfraProvider] = React.useState<InfrastructureProvider | undefined>();

    // https://developers.google.com/identity/protocols/oauth2#clientside
    // https://cloud.google.com/iam/docs/creating-managing-service-accounts#iam-service-accounts-create-rest
    // https://cloud.google.com/docs/authentication/end-user
    // https://developer.chrome.com/extensions/tut_oauth
    function googleSignIn() {
        fetch(
            'https://cloudresourcemanager.googleapis.com/v1/projects',
            {
                method: "POST",
                mode: "cors",
                cache: "no-cache",
                credentials: "same-origin",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name: "Test Project Name"
                })
            }
        )
    }

    return (
        <SignedInPage>
            <CenterHorizontal>
                <div>
                    <CenterHorizontal>
                        <Title text="Register Infrastructure" />
                    </CenterHorizontal>
                    <FormInput label="Choose Provider">
                        <CenterHorizontal>
                        {
                            (Object.keys(InfrastructureProvider) as InfrastructureProvider[]).map((provider, index) => {
                                return <InfrastructureOption key={index} provider={provider} onClick={() => setInfraProvider(provider)} selected={infraProvider === provider} />
                            })
                        }
                        </CenterHorizontal>
                    </FormInput>
                </div>
            </CenterHorizontal>
            {
                infraProvider !== undefined && <>
                    <CenterHorizontal>
                        <p style={{textAlign:'center', width: 600}}>
                            { InfrastructureProviderInfo[infraProvider].details }
                        </p>
                    </CenterHorizontal>
                    <CenterHorizontal>
                        <Button text="Continue" onClick={() => googleSignIn()} />
                    </CenterHorizontal>
                </>
            }
        </SignedInPage>
    );
}