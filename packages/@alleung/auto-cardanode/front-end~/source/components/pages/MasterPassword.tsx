import * as React from 'react';
import { rpcClient } from '../../rpc-client';
import { Button } from '../buttons/Button';
import { Page } from '../../model/pages';
import { SUCCESS, useStore } from '../../model/state';
import { KeyFileDecryptError } from '../../utils/key-file-accessor';
import { CenterContent } from '../layouts/CenterContent';
import { CenterInlineContent } from '../layouts/CenterInlineContent';
import { Title } from '../Title';
import { TextInput, TextInputType } from '../TextInput';
import { ErrorReporter } from '../ErrorReporter';

export const MasterPassword: React.FC = () => {
    const [errorText, setErrorText] = React.useState<string | undefined>(undefined);
    const [currentPassword, setPassword] = React.useState("");
    const [updatePage, decryptKeyStore] = useStore(state => [state.updatePage, state.decryptKeyStore]);

    async function submitPassword() {
        const decryptionResult = await decryptKeyStore(currentPassword);
        if (decryptionResult === SUCCESS) {
            updatePage(Page.Dashboard)
        } else {
            const errorCodesMeaningInvalidPassOrFile = [
                KeyFileDecryptError.CorruptKeyFileJSON,
                KeyFileDecryptError.PasswordMismatch,
                KeyFileDecryptError.DecryptionResultsInNonUTFData
            ];
            if (errorCodesMeaningInvalidPassOrFile.includes(decryptionResult)) {
                setErrorText("incorrect password or key file");
            } else {
                setErrorText(decryptionResult);
            }
        }
    }

    return <div>
                <CenterContent>
                    <form onSubmit={e => {e.preventDefault(); submitPassword();}}>
                        <TextInput type={TextInputType.Password} label="Master Password"
                            onChange={setPassword} />
                    </form>
                    <ErrorReporter text={errorText} />
                    <CenterInlineContent width={250}>
                        <Button text="Back" onClick={() => updatePage(Page.Launch)} />
                        <Button text="Submit" onClick={() => submitPassword()} />
                    </CenterInlineContent>
                </CenterContent> 
            </div>
}