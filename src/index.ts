import * as fs from 'fs';
import { sign, verify } from 'jsonwebtoken';

const main = async () => {
    const keyDir = `${__dirname}/../keys`;
    const privateKeyName = `jwtRS256.key`;
    const publicKeyName = `jwtRS256.key.pub`;

    const generateToken = async (): Promise<string> => {
        const privateKey = await fs.promises.readFile(`${keyDir}/${privateKeyName}`);
        return sign({ foo: 'bar' }, privateKey, { algorithm: 'RS256' });
    };

    const verifyToken = async (token: string): Promise<boolean> => {
        const publicKey = await fs.promises.readFile(`${keyDir}/${publicKeyName}`);
        try {
            verify(token, publicKey);
            return true;
        } catch (e) {
            if (e instanceof Error) {
                console.error('Error: ', e.message);
            } else {
                console.error('Error: ', e);
            }
            return false;
        }
    };


    const token = await generateToken();
    if(await verifyToken(token)){
	    console.error('Succeeded to generate/verify the access token.');
    }
};

main();
