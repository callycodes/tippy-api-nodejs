import express from 'express';
import * as http from 'http';

import * as winston from 'winston';
import * as expressWinston from 'express-winston';
import cors from 'cors';
import debug from 'debug';

require("dotenv").config();

import mongoose from 'mongoose';

import { CommonRoutesConfig } from './common/common.routes.config';
import { UsersRoutes } from './routes/users.routes.config';
import { TeamsRoutes } from './routes/teams.routes.config';
import { AuthenticationRoutes } from './routes/authentication.routes.config';
import { QRConfigurationRoutes } from './routes/qrconfiguration.routes.config';
import { StripeRoutes } from './routes/stripe.routes.config';
import { PayoutMethodsRoutes } from './routes/payoutmethods.routes.config';

const app: express.Application = express();
const server: http.Server = http.createServer(app);
const port = 3000;
const routes: Array<CommonRoutesConfig> = [];
const debugLog: debug.IDebugger = debug('app');

app.use(express.json());
app.use(cors());

const loggerOptions: expressWinston.LoggerOptions = {
    transports: [new winston.transports.Console()],
    format: winston.format.combine(
        winston.format.json(),
        winston.format.prettyPrint(),
        winston.format.colorize({ all: true })
    ),
};

if (!process.env.DEBUG) {
    loggerOptions.meta = false;
}

app.use(expressWinston.logger(loggerOptions));

routes.push(new UsersRoutes(app));
routes.push(new TeamsRoutes(app));
routes.push(new AuthenticationRoutes(app));
routes.push(new QRConfigurationRoutes(app));
routes.push(new PayoutMethodsRoutes(app));
routes.push(new StripeRoutes(app));

const runningMessage = `Server running at http://localhost:${port}`;

app.get('/', (req: express.Request, res: express.Response) => {
    res.status(200).send(runningMessage)
});

let mongoose_connection = process.env.MONGOOSE_DB as string;
if (process.env.NODE_ENV == "test") {
    mongoose_connection = process.env.MONGOOSE_TEST_DB as string;
}

mongoose.connect(mongoose_connection, {useNewUrlParser: true, useUnifiedTopology: true});
debugLog('Mongoose connection started');

server.listen(port, () => {
  routes.forEach((route: CommonRoutesConfig) => {
      debugLog(`Routes configured for ${route.getName()}`);
  });

  console.log(runningMessage);
});

module.exports = app;
