import {CommonRoutesConfig} from '../common/common.routes.config';
import express from 'express';
import PayoutMethodsController from '../controllers/payoutmethods.controller';
import e from 'express';

export class PayoutMethodsRoutes extends CommonRoutesConfig {
    constructor(app: express.Application) {
        super(app, 'PayoutMethodsRoutes');
    }

    configureRoutes() {
      
      this.app.route('/payout-methods/')
        .get((req: express.Request, res: express.Response) => {
          PayoutMethodsController.getAll(req, res);
        })
        .post((req: express.Request, res: express.Response) => {
          PayoutMethodsController.createContainer(req, res);
        });

      this.app.route('/payouts-methods/:ownerType/:ownerId')
        .all((req: express.Request, res: express.Response, next: express.NextFunction) => {
          next();
        })
        .get((req: express.Request, res: express.Response) => {
          PayoutMethodsController.getById(req, res);
        })
        .put((req: express.Request, res: express.Response) => {
          PayoutMethodsController.putById(req, res);
        })
        .patch((req: express.Request, res: express.Response) => {
          PayoutMethodsController.patchById(req, res);
        })
        .delete((req: express.Request, res: express.Response) => {
          PayoutMethodsController.deleteById(req, res);
        });
      return this.app;
  }
}