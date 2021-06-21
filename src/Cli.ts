import { program }from 'commander';
import { Authorization } from './authorization';

export class Cli {
    auth: Authorization;

    constructor(auth: Authorization) {
        this.auth = auth;
    }

    public cli = async (argv: any) => {
        program
            .command('generate')
            .description('generate access token')
            .action(async (cmd) => {
                const token = await this.auth.generateToken();
                console.log('Generated access token:', token);
            });

        program
            .command('verify <token>')
            .description('vefity access token')
            .action(async (token:string) => {
                if (await this.auth.verifyToken(token)) {
                    console.error('Succeeded to generate/verify the access token.');
                }
            });

        program.parse(argv);
    };
}