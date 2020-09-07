import create from 'zustand';
import { keyFileAccessor, KeyFileDecryptError, KeyFileReadError } from '../utils/key-file-accessor';
import { KeyFileContents } from '@alleung/auto-cardanode-common';
import { Page } from './pages';

export const SUCCESS = Symbol("SUCCESS");

type KeyStoreState =
    {type: 'missing'} |
    {type: 'encrypted', value: ArrayBuffer} |
    {type: 'decrypted', value: KeyFileContents};

type State = {
    currentPage: Page;
    keyStore: KeyStoreState;
    updatePage: (newPage: Page) => void;
    uploadKeyStore: (fileList: FileList) => Promise<KeyFileReadError | typeof SUCCESS>
    decryptKeyStore: (password: string) => Promise<KeyFileDecryptError | typeof SUCCESS>
}

export const useStore = create<State>((set, get): State => ({
    currentPage: Page.Launch,
    keyStore: {type: 'missing'},
    updatePage: newPage => {
        if (newPage === Page.Launch) {
            // If they're going back to launch we want to clear out their key store, which essentially represents
            // whether or not they are "logged in".
            set({
                currentPage: newPage,
                keyStore: {type: 'missing'}
            });
        } else {
            set({currentPage: newPage});
        }
    },
    uploadKeyStore: async files => {
        if (get().keyStore.type !== 'missing') {
            return KeyFileReadError.KeyStoreAlreadyPresent;
        }
        const readResponse = await keyFileAccessor.readKeyFile(files);
        if (readResponse.type == 'error') {
            return readResponse.result;
        } else {
            set({
                keyStore: {type: 'encrypted', value: readResponse.result}
            });
        }
        return SUCCESS;
    },
    decryptKeyStore: async password => {
        const currentKeyStore = get().keyStore;
        if (currentKeyStore.type === 'missing') {
            return KeyFileDecryptError.NoKeyStoreFilePresent;
        } else if (currentKeyStore.type === 'decrypted') {
            return KeyFileDecryptError.KeyStoreAlreadyDecrypted;
        } else {
            const decryptResponse = await keyFileAccessor.decryptKeyFile(currentKeyStore.value, password);
            if (decryptResponse.type === 'error') {
                return decryptResponse.result;
            }
            set({
                keyStore: {type: 'decrypted', value: decryptResponse.result}
            });
        }
        return SUCCESS;
    }
}));