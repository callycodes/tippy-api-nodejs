import {CommonRoutesConfig} from '../common/common.routes.config';
import express from 'express';
import QRConfigurationController from '../controllers/qrconfiguration.controller';
import e from 'express';

export class QRConfigurationRoutes extends CommonRoutesConfig {
    constructor(app: express.Application) {
        super(app, 'QRConfigurationRoutes');
    }

    configureRoutes() {
      
      this.app.route('/qr/')
        .post((req: express.Request, res: express.Response) => {
          QRConfigurationController.createQRConfiguration(req, res);
        });

      this.app.route('/qr/:id')
        .all((req: express.Request, res: express.Response, next: express.NextFunction) => {
          if (!req.params.userId) {
            res.status(401).send('No USER ID');
          } else {
            next();
          }
        })
        .get((req: express.Request, res: express.Response) => {
          QRConfigurationController.getQRConfigurationById(req, res);
        })
        .put((req: express.Request, res: express.Response) => {
          QRConfigurationController.putQRConfigurationById(req, res);
        })
        .patch((req: express.Request, res: express.Response) => {
          QRConfigurationController.patchQRConfigurationById(req, res);
        })
        .delete((req: express.Request, res: express.Response) => {
          QRConfigurationController.deleteQRConfigurationById(req, res);
        });


      this.app.route('/qr/:ownerId');
      this.app.route('/qr/generate/:id').get((req: express.Request, res: express.Response) => {
        QRConfigurationController.generateQRImage(req, res);
      });

      return this.app;
  }
}