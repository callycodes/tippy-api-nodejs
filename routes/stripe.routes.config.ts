import {CommonRoutesConfig} from '../common/common.routes.config';
import express from 'express';
import StripeController from '../controllers/stripe.controller';

export class StripeRoutes extends CommonRoutesConfig {
    constructor(app: express.Application) {
        super(app, 'StripeRoutes');
    }

    configureRoutes() {
      
      this.app.route('/stripe/connect')
        .post((req: express.Request, res: express.Response) => {
          StripeController.connectStripeAccount(req, res);
        });

        this.app.route('/stripe/:accountId')
        .get((req: express.Request, res: express.Response) => {
          StripeController.getStripeAccount(req, res);
        });

      
      return this.app;
  }
}