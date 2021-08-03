import {CommonRoutesConfig} from '../common/common.routes.config';
import express from 'express';
import AuthenticationController from '../controllers/authentication.controller';

export class CheckoutRoutes extends CommonRoutesConfig {
    constructor(app: express.Application) {
        super(app, 'CheckoutRoutes');
    }

    configureRoutes() {
      
      this.app.route('/checkout/create')
        .post((req: express.Request, res: express.Response) => {
          AuthenticationController.authenticateUser(req, res);
        });

      
      return this.app;
  }
}