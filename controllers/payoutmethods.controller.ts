import express from "express";
import PayoutMethodsService from '../services/payoutmethods.service';
import { Response, ResponseType } from '../common/response.interface';

class PayoutMethodsController {

  async createContainer(req: express.Request, res: express.Response) {
    try {
      const methodsContainer = await PayoutMethodsService.create(req.body);
      res.status(201).send({ id: methodsContainer._id });
    } catch (error) {
        res.status(401).send(error);
    }
  }

  async getById(req: express.Request, res: express.Response) {
    try {
      const methodsContainer = await PayoutMethodsService.readById(req.params.ownerId, req.params.ownerType);
      res.status(201).send(methodsContainer.toJSON());
    } catch {
      res.status(401).send('No User');
    }
  }

  async getAll(req: express.Request, res: express.Response) {
    try {
      const methodsContainers = await PayoutMethodsService.list();
      const response: Response = { type: ResponseType.Success, data: methodsContainers };
      res.status(201).send(response);
    } catch {
      const response: Response = { type: ResponseType.Error, message: "Error retrieving methods containers" };
      res.status(401).send(response);
    }
  }

  async putById(req: express.Request, res: express.Response) {
    try {
      await PayoutMethodsService.putById(req.params.ownerId, req.params.ownerType, req.body);
      const response: Response = { type: ResponseType.Success, message: "User updated" };
      res.status(201).send(response);
    } catch {
      const response: Response = { type: ResponseType.Error, message: "Error updating" };
      res.status(401).send(response);
    }
  }

  async patchById(req: express.Request, res: express.Response) {
    try {
      await PayoutMethodsService.patchById(req.params.ownerId, req.params.ownerType, req.body)
      const response: Response = { type: ResponseType.Success, message: "User patched" };
      res.status(201).send(response);
    } catch {
      const response: Response = { type: ResponseType.Error, message: "Error patching" };
      res.status(401).send(response);
    }
  }


  async deleteById(req: express.Request, res: express.Response) {
    try {
      await PayoutMethodsService.deleteById(req.params.ownerId, req.params.ownerType)
      const response: Response = { type: ResponseType.Success, message: "User deleted" };
      res.status(201).send(response);
    } catch {
      const response: Response = { type: ResponseType.Error, message: "Error deleting" };
      res.status(401).send(response);
    }
  }
  
}

export default new PayoutMethodsController();