import express from "express";
import UsersService from '../services/users.service';
import { Response, ResponseType } from '../common/response.interface';
import authenticationService from "../services/authentication.service";

class AuthenticationController {

  async registerUser(req: express.Request, res: express.Response) {
    try {
      const user = await UsersService.create(req.body);
      res.status(201).send({ id: user._id });
    } catch (error) {
      res.status(401).send(error);
    }
  }

  async authenticateUser(req: express.Request, res: express.Response) {
    try {
      const user = await UsersService.readByEmailWithPassword(req.body.email);
      if (!user) {
        const response: Response = { type: ResponseType.Error, message: "No user registered with that email" };
        res.status(401).send(response);
      } else {
        if (user.password_hash != req.body.password_hash) {
          const response: Response = { type: ResponseType.Error, message: "Incorrect user credentials" };
          res.status(401).send(response);
        } else {
          res.status(201).send('authenticated')
        }
      }
    } catch {
      const response: Response = { type: ResponseType.Error, message: "Incorrect user credentials" };
      res.status(401).send(response);
    }
  }

  async createToken(req: express.Request, res: express.Response) {
    try {
      const token = await authenticationService.createToken(req.body.id, req.body.email);
      res.status(201).send(token);
    } catch {
      res.status(401).send('No Token');
    }
  }

  async validateToken(req: express.Request, res: express.Response) {
    try {

      const validation = await authenticationService.validateToken(req.headers.authorization!);
      res.status(201).send(validation);
    } catch {
      res.status(401).send('No validation');
    }
  }

  async verifyToken(req: express.Request, res: express.Response) {
    try {
      const user = await UsersService.readById(req.params.userId);
      res.status(201).send(user.toJSON());
    } catch {
      res.status(401).send('No User');
    }
  }
  
}

export default new AuthenticationController();