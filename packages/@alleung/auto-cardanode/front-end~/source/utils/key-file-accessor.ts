import { KeyFileContents } from '@alleung/auto-cardanode-common';
import { downloadFileWithContents } from './downloader';
import { cryptography } from './crypto';

export enum KeyFileReadError {
    MultipleFiles = "MultipleFiles",
    NoFiles = "NoFiles",
    KeyStoreAlreadyPresent = "KeyStoreAlreadyPresent"
}

export enum KeyFileDecryptError {
    NoKeyStoreFilePresent = "NoKeyStoreFilePresent",
    KeyStoreAlreadyDecrypted = "KeyStoreAlreadyDecrypted",
    CorruptKeyFileJSON = "CorruptKeyFileJSON",
    PasswordMismatch = "PasswordMismatch",
    DecryptionResultsInNonUTFData = "DecryptionResultsInNonUTFData"
}

export type ReadKeyFileResponse = 
  {type: 'success', result: ArrayBuffer} |
  {type: 'error',   result: KeyFileReadError.MultipleFiles} |
  {type: 'error',   result: KeyFileReadError.NoFiles};

export type DecryptKeyFileResponse =
  {type: 'success', result: KeyFileContents} |
  {type: 'error',  result: KeyFileDecryptError.CorruptKeyFileJSON} |
  {type: 'error',  result: KeyFileDecryptError.PasswordMismatch} |
  {type: 'error',  result: KeyFileDecryptError.DecryptionResultsInNonUTFData};

// https://stackoverflow.com/questions/9267899/arraybuffer-to-base64-encoded-string
function arrayBufferToBase64( buffer: ArrayBuffer ): string {
    var binary = '';
    var bytes = new Uint8Array( buffer );
    var len = bytes.byteLength;
    for (var i = 0; i < len; i++) {
        binary += String.fromCharCode( bytes[ i ] );
    }
    return btoa( binary );
}

export const keyFileAccessor = {
    // https://developer.mozilla.org/en-US/docs/Web/API/FileReader/readAsArrayBuffer
    async readKeyFile(fileList: FileList): Promise<ReadKeyFileResponse> {
        const reader = new FileReader();
        if (fileList.length === 0) return {
            type: 'error',
            result: KeyFileReadError.NoFiles
        };
        if (fileList.length > 1) return {
            type: 'error',
            result: KeyFileReadError.MultipleFiles,
        }
        const file = fileList[0];
        const arrayBufferFuture = new Promise<ArrayBuffer>(resolve => {
            reader.onloadend = () => {
                const binary = reader.result as ArrayBuffer;
                resolve(binary)
            }
        })
        reader.readAsArrayBuffer(file);
        const arrayBuffer = await arrayBufferFuture;
        return {
            type: 'success',
            result: arrayBuffer
        };
    },
    async decryptKeyFile(encryptedFileContents: ArrayBuffer, password: string): Promise<DecryptKeyFileResponse> {
        const decodedEncryptedContents = new TextDecoder().decode(encryptedFileContents);
        const hashedPassword = cryptography.hashPassword(password);
        const decryptedContents = cryptography.decrypt(decodedEncryptedContents, hashedPassword);

        if (decryptedContents === undefined) {
            return {
                type: 'error',
                result: KeyFileDecryptError.DecryptionResultsInNonUTFData
            };
        }

        var keyFile: KeyFileContents;
        try {
            keyFile = JSON.parse(decryptedContents);
        } catch (e) {
            return {
                type: "error",
                result: KeyFileDecryptError.CorruptKeyFileJSON
            };
        }

        if (keyFile.passwordHash !== hashedPassword) {
            return {
                type: "error",
                result: KeyFileDecryptError.PasswordMismatch
            };
        }

        // TODO: have some validation here of the keyfile.
        //       at this point it's possible that password and file are correct, but
        //       user is using an old version of the file which doesn't match current format.

        return {
            type: 'success',
            result: keyFile
        };
    },
    async downloadEncryptedKeyFile(keyFile: KeyFileContents, filename: string) {
        const keyFileJson = JSON.stringify(keyFile);
        const encryptedContents = cryptography.encrypt(keyFileJson, keyFile.passwordHash);
        downloadFileWithContents(encryptedContents, filename);
    } 
}