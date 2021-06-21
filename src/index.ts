#!/usr/bin/env node
import { Authorization } from "./authorization";
import {Cli} from "./Cli";

const main = async () => {
    const auth = new Authorization('jwtRS256.key', 'jwtRS256.key.pub');
    const cli = new Cli(auth);
    cli.cli(process.argv);

    };

main();
