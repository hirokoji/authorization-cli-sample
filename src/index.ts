import { Authorization } from "./authorization";

const main = async () => {
    const auth = new Authorization('jwtRS256.key', 'jwtRS256.key.pub');

    const token = await auth.generateToken();
    if(await auth.verifyToken(token)){
	    console.error('Succeeded to generate/verify the access token.');
    }
};

main();
