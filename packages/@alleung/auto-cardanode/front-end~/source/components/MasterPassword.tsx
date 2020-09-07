import * as React from 'react';
import { rpcClient } from '../rpc-client';
import { Button } from './buttons/Button';
import { Page } from './pages';
import { SUCCESS, useStore } from './state';
import { Header } from './Header';
import { KeyFileDecryptError } from '../utils/key-file-accessor';

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
        <div className="masterPassword" style={{
            display:'flex',
            flexDirection:'column',
            height: '100vh',
            justifyContent: 'center',
            alignItems: 'center',
            color: '#3a4660',
        }}>
                
            <h1>Master Password</h1>
            <form onSubmit={e => {e.preventDefault(); submitPassword();}}>
                <input type="password" onChange={e => setPassword(e.target.value)} />
            </form>
            {
                errorText && <div style={{color: 'red'}}>
                    { errorText }
                </div>
            }
            <div>

            </div>
            <Button text="Submit" onClick={() => submitPassword()} />
            <Button text="Back" onClick={() => updatePage(Page.Launch)} />
        </div>
    </div>;
}