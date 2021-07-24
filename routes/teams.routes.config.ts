import {CommonRoutesConfig} from '../common/common.routes.config';
import express from 'express';

export class TeamsRoutes extends CommonRoutesConfig {
    constructor(app: express.Application) {
        super(app, 'TeamsRoutes');
    }

    configureRoutes() {
      
      this.app.route('/teams')
        .get((req: express.Request, res: express.Response) => {
          res.status(200).send('List of teams');
        })
        .post((req: express.Request, res: express.Response) => {
          res.status(200).send('Post to teams');
        });

      this.app.route('/teams/:teamId')
        .all((req: express.Request, res: express.Response, next: express.NextFunction) => {
          next();
        })
        .get((req: express.Request, res: express.Response) => {
          res.status(200).send(`GET requested for id ${req.params.teamId}`);
        })
        .put((req: express.Request, res: express.Response) => {
          res.status(200).send(`PUT requested for id ${req.params.teamId}`);
        })
        .patch((req: express.Request, res: express.Response) => {
          res.status(200).send(`PATCH requested for id ${req.params.teamId}`);
        })
        .delete((req: express.Request, res: express.Response) => {
          res.status(200).send(`DELETE requested for id ${req.params.teamId}`);
        });
      return this.app;
  }
}