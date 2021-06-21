import * as fs from 'fs';
import { sign, verify } from 'jsonwebtoken';

export class Authorization{
        keyDir = `${__dirname}/../keys`;
	privateKeyName: string
	publicKeyName: string;

	constructor(privateKeyName:string, publicKeyName:string){
		this.privateKeyName = privateKeyName;
		this.publicKeyName = publicKeyName;
	}

    generateToken = async (): Promise<string> => {
        const privateKey = await fs.promises.readFile(`${this.keyDir}/${this.privateKeyName}`);
        return sign({ foo: 'bar' }, privateKey, { algorithm: 'RS256' });
    };

    verifyToken = async (token: string): Promise<boolean> => {
        const publicKey = await fs.promises.readFile(`${this.keyDir}/${this.publicKeyName}`);
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


}