import "reflect-metadata";
import dotenv from 'dotenv';
import express from 'express';
import log4js from 'log4js';
import { createExpressServer } from 'routing-controllers';

dotenv.config();

const logger = log4js.getLogger();
logger.level = process.env.LOG_LEVEL as string;

// logger.info('log4js log info');
// logger.debug('log4js log debug');
// logger.error('log4js log error');

// const app = express();
const port = process.env.PORT;

// app.get('/', (request, response) => {
//     response.send('Hello world!');
// });


const app: express.Application = createExpressServer({
    controllers: [__dirname + '/routes/**/*{.ts,.js}'], // we specify controllers we want to use
}).listen(port, () => console.log(`Running on port ${port}`));