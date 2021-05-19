import { GoogleCloudServiceAccountJson } from '@alleung/auto-cardanode-common';
import * as React from 'react';
import { CenterHorizontal } from '../layouts/CenterHoriz';
import { TextInput, TextInputType } from '../TextInput';
import { RadioButtons } from '../form/RadioButtons';

export enum GCPRegistrationOptions {
    NewProject = "NewProject",
    ExistingProject = "ExistingProject"
}

export const RegisterGCPForm: React.FC<{onServiceAccountObtained: (serviceAccount: GoogleCloudServiceAccountJson) => void}> = () => {
    const [registrationOption, setRegOption] = React.useState(GCPRegistrationOptions.NewProject);
    const [projectId, setProjectId] = React.useState("");
    const [projectName, setProjectName] = React.useState("");

    const inputParams: {[o in GCPRegistrationOptions]: {label: string; onChange: React.Dispatch<React.SetStateAction<string>>; value: string}} = {
        [GCPRegistrationOptions.ExistingProject]: {
            label: "Existing Project ID",
            onChange: setProjectId,
            value: projectId
        },
        [GCPRegistrationOptions.NewProject]: {
            label: "New Project Name",
            onChange: setProjectName,
            value: projectName
        }
    };

    return (
        <CenterHorizontal>
            <div>
                <RadioButtons<GCPRegistrationOptions>
                    selectionLabel="New or Existing?"
                    initial={registrationOption}
                    labels={{
                        [GCPRegistrationOptions.NewProject]: "Create New GCP Project",
                        [GCPRegistrationOptions.ExistingProject]: "Register Existing GCP Project"
                    }}
                    onChange={setRegOption}
                />
                <TextInput type={TextInputType.SingleLine} {...inputParams[registrationOption]} />
            </div>
        </CenterHorizontal>
    )
}