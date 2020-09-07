import CryptoES from 'crypto-es';

const IV_BYTES = 16;
const IV_NYBBLES = IV_BYTES * 2; // A "nybble" is a hexidecimal digit.

export const cryptography = {
    hashPassword: (password: string) => {
        return CryptoES.SHA512(password).toString(CryptoES.enc.Hex);
    },
    // https://embed.plnkr.co/0VPU1zmmWC5wmTKPKnhg/
    // https://stackoverflow.com/questions/25492179/decode-a-base64-string-using-cryptojs
    // https://github.com/brix/crypto-js/issues/276#issuecomment-612026588
    encrypt: (contentToEncrypt: string, hashedPassword: string) => {
        const initializationVector = CryptoES.lib.WordArray.random(IV_BYTES);
        return initializationVector.toString() + CryptoES.AES.encrypt(
            CryptoES.enc.Utf8.parse(contentToEncrypt),
            hashedPassword,
            {
                iv: initializationVector,
                padding: CryptoES.pad.Pkcs7
            }
        ).toString();
    },
    decrypt: (encryptedContent: string, hashedPassword: string): string | undefined => {
        const initializationVector = CryptoES.enc.Hex.parse(encryptedContent.substr(0, IV_NYBBLES));
        const decrypted = CryptoES.AES.decrypt(
            encryptedContent.substr(IV_NYBBLES),
            hashedPassword,
            {
                iv: initializationVector,
                padding: CryptoES.pad.Pkcs7
            }
        );
        try {
            return CryptoES.enc.Utf8.stringify(decrypted);
        } catch (e) {
            return undefined;
        }
    }  
};