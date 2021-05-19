import * as React from 'react';
import { Button } from '../buttons/Button';
import { useStore, SUCCESS } from '../../model/state';
import { Page } from '../../model/pages';
import { FileUploadSubmitButton } from '../buttons/FileUploadButton';
import { CenterVeritcalAndHorizontal } from '../layouts/CenterVertAndHoriz';
import { rpcClient } from '../../rpc-client';
import { keyFileAccessor } from '../../utils/key-file-accessor';

function Home() {
    const [updatePage, uploadKeyStore] = useStore(state => [state.updatePage, state.uploadKeyStore]);
    const [uploadError, setUploadError] = React.useState<undefined | string>(undefined);

    async function fileSelected(e: React.ChangeEvent<HTMLInputElement>) {
        const files = e.target.files;
        if (files === null)  {
            setUploadError("No files appear to be uploaded");
        } else {
            const response = await uploadKeyStore(files);
            if (response === SUCCESS) {
                updatePage(Page.MasterPassword);
            } else {
                setUploadError(response);
            }
        }
    }

    async function getTestKeyFile() {
        const testKeyFile = await rpcClient.GetTestKeyFile({});
        await keyFileAccessor.downloadEncryptedKeyFile(testKeyFile, "test-key-file");
    }

    return (
        <div>
            <CenterVeritcalAndHorizontal>
                <h1>Pools for Fools</h1>
                <FileUploadSubmitButton text="Upload Existing Key File" onChange={fileSelected} />
                {
                    uploadError && <div style={{color: 'red'}}>
                        { uploadError }
                    </div>
                }
                <Button text="Create New Key File" onClick={() => updatePage(Page.CreateNewKeyFile)} />
                <Button text="Download Test Key File" onClick={() => getTestKeyFile()} />
            </CenterVeritcalAndHorizontal>
        </div>
    )
}

export default Home;