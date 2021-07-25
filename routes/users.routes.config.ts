import {CommonRoutesConfig} from '../common/common.routes.config';
import express from 'express';
import UsersController from '../controllers/users.controller';
import e from 'express';

export class UsersRoutes extends CommonRoutesConfig {
    constructor(app: express.Application) {
        super(app, 'UsersRoutes');
    }

    configureRoutes() {
      
      this.app.route('/users')
        .get((req: express.Request, res: express.Response) => {
          UsersController.getAllUsers(req, res);
        })
        .post((req: express.Request, res: express.Response) => {
          UsersController.createUser(req, res);
        });

      this.app.route('/users/:userId')
        .all((req: express.Request, res: express.Response, next: express.NextFunction) => {
          if (!req.params.userId) {
            res.status(401).send('No USER ID');
          } else {
            next();
          }
        })
        .get((req: express.Request, res: express.Response) => {
          UsersController.getUserById(req, res);
        })
        .put((req: express.Request, res: express.Response) => {
          UsersController.putUserById(req, res);
        })
        .patch((req: express.Request, res: express.Response) => {
          UsersController.patchUserById(req, res);
        })
        .delete((req: express.Request, res: express.Response) => {
          UsersController.deleteUserById(req, res);
        });
      return this.app;
  }
}