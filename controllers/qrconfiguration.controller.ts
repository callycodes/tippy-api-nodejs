import express from "express";
import QRConfigurationService from '../services/qrconfiguration.service';
import { QRConfiguration } from '../models/qrconfiguration.model';
import { Response, ResponseType } from '../common/response.interface';
const axios = require('axios');
import { AxiosPromise } from 'axios';

class QRConfigurationController {

  async createQRConfiguration(req: express.Request, res: express.Response) {
    try {
      const qr_config = await QRConfigurationService.create(req.body);
      res.status(201).send({ id: qr_config._id });
    } catch (error) {
        res.status(401).send(error);
    }
  }

  async generateQRImage(req:express.Request, res: express.Response) {
    try {
      const qr_config = await QRConfigurationService.readById(req.params.id);
      console.log(qr_config)
      const qr_data = await axios.post("http:\/\/127.0.0.1:5000/generate", qr_config);
      console.log('Found data:');
      res.status(201).send(qr_data.data);
    } catch (error) {

      res.status(401).send(error);
    }
  }

  async getQRConfigurationById(req: express.Request, res: express.Response) {
    try {
      const qr_config = await QRConfigurationService.readById(req.params.id);
      res.status(201).send(qr_config.toJSON());
    } catch {
      res.status(401).send('No Configuration');
    }
  }

  async getAllQRConfigurationByOwnerId(req: express.Request, res: express.Response) {
    try {
      const qr_configs = await QRConfigurationService.readByOwnerId(req.params.owner_id);
      const response: Response = { type: ResponseType.Success, data: qr_configs };
      res.status(201).send(response);
    } catch {
      const response: Response = { type: ResponseType.Error, message: "Error retrieving configurations" };
      res.status(401).send(response);
    }
  }

  async putQRConfigurationById(req: express.Request, res: express.Response) {
    try {
      await QRConfigurationService.putById(req.params.id, req.body);
      const response: Response = { type: ResponseType.Success, message: "Configuration updated" };
      res.status(201).send(response);
    } catch {
      const response: Response = { type: ResponseType.Error, message: "Error updating" };
      res.status(401).send(response);
    }
  }

  async patchQRConfigurationById(req: express.Request, res: express.Response) {
    try {
      await QRConfigurationService.patchById(req.params.id, req.body)
      const response: Response = { type: ResponseType.Success, message: "Configuration patched" };
      res.status(201).send(response);
    } catch {
      const response: Response = { type: ResponseType.Error, message: "Error patching" };
      res.status(401).send(response);
    }
  }

  async deleteQRConfigurationById(req: express.Request, res: express.Response) {
    try {
      await QRConfigurationService.deleteById(req.params.id)
      const response: Response = { type: ResponseType.Success, message: "Configuration deleted" };
      res.status(201).send(response);
    } catch {
      const response: Response = { type: ResponseType.Error, message: "Error deleting" };
      res.status(401).send(response);
    }
  }
  
}

export default new QRConfigurationController();