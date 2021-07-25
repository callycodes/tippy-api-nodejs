import {CommonRoutesConfig} from '../common/common.routes.config';
import express from 'express';
import AuthenticationController from '../controllers/authentication.controller';

export class AuthenticationRoutes extends CommonRoutesConfig {
    constructor(app: express.Application) {
        super(app, 'AuthenticationRoutes');
    }

    configureRoutes() {
      
      this.app.route('/auth/login')
        .post((req: express.Request, res: express.Response) => {
          AuthenticationController.authenticateUser(req, res);
        });

      this.app.route('/auth/register')
        .post((req: express.Request, res: express.Response) => {
          AuthenticationController.registerUser(req, res);
        });

        this.app.route('/auth/create')
        .post((req: express.Request, res: express.Response) => {
          AuthenticationController.createToken(req, res);
        });

        this.app.route('/auth/validate')
        .post((req: express.Request, res: express.Response) => {
          AuthenticationController.validateToken(req, res);
        });

      this.app.route('/auth/verify')
        .get((req: express.Request, res: express.Response) => {
          AuthenticationController.verifyToken(req, res);
        });

      return this.app;
  }
}