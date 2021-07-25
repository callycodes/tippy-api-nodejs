import express from "express";
import UsersService from '../services/users.service';
import { Response, ResponseType } from '../common/response.interface';

class UsersController {

  async createUser(req: express.Request, res: express.Response) {
    //req.body.password_hash = await argon2.hash(req.body.password);
    try {
      const user = await UsersService.create(req.body);
      res.status(201).send({ id: user._id });
    } catch (error) {
        res.status(401).send(error);
    }
  }

  async getUserById(req: express.Request, res: express.Response) {
    try {
      const user = await UsersService.readById(req.params.userId);
      res.status(201).send(user.toJSON());
    } catch {
      res.status(401).send('No User');
    }
  }

  async getAllUsers(req: express.Request, res: express.Response) {
    try {
      const users = await UsersService.list();
      const response: Response = { type: ResponseType.Success, data: users };
      res.status(201).send(response);
    } catch {
      const response: Response = { type: ResponseType.Error, message: "Error retrieving users" };
      res.status(401).send(response);
    }
  }

  async putUserById(req: express.Request, res: express.Response) {
    try {
      await UsersService.putById(req.params.userId, req.body);
      const response: Response = { type: ResponseType.Success, message: "User updated" };
      res.status(201).send(response);
    } catch {
      const response: Response = { type: ResponseType.Error, message: "Error updating" };
      res.status(401).send(response);
    }
  }

  async patchUserById(req: express.Request, res: express.Response) {
    try {
      await UsersService.patchById(req.params.userId, req.body)
      const response: Response = { type: ResponseType.Success, message: "User patched" };
      res.status(201).send(response);
    } catch {
      const response: Response = { type: ResponseType.Error, message: "Error patching" };
      res.status(401).send(response);
    }
  }

  async deleteUserById(req: express.Request, res: express.Response) {
    try {
      await UsersService.deleteById(req.params.userId)
      const response: Response = { type: ResponseType.Success, message: "User deleted" };
      res.status(201).send(response);
    } catch {
      const response: Response = { type: ResponseType.Error, message: "Error deleting" };
      res.status(401).send(response);
    }
  }
  
}

export default new UsersController();