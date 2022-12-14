import express, {Express} from 'express'
import cors from 'cors'

export const app: Express = express();

app.use(express.json());
app.use(cors());

import { AddressInfo } from "net";

const server = app.listen(Number(process.env.PORT) || 3003, () => {
    if (server) {
       const address = server.address() as AddressInfo;
       console.log(`Server is running in http://localhost: ${address.port}`);
    } else {
       console.error(`Failure upon starting server.`);
    }
});