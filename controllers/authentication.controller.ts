import express from "express";
import UsersService from '../services/users.service';
import { Response, ResponseType } from '../common/response.interface';
import authenticationService from "../services/authentication.service";
import argon2 from 'argon2';
import usersService from "../services/users.service";

class AuthenticationController {

  async registerUser(req: express.Request, res: express.Response) {
    try {
      req.body.password_hash = await argon2.hash(req.body.password);
      const user = await UsersService.create(req.body);
      const token = await authenticationService.createToken(user._id, user.email);
      const response: Response = { type: ResponseType.Error, data: { user, token } };
      res.status(201).send(response);
    } catch (error) {
      const response: Response = { type: ResponseType.Error, message: "Sorry, there was an error when registering" };
      res.status(401).send(response);
    }
  }

  async authenticateUser(req: express.Request, res: express.Response) {
    try {
      const user = await UsersService.readByEmailWithPassword(req.body.email);
      if (!user) {
        const response: Response = { type: ResponseType.Error, message: "No user registered with that email" };
        res.status(401).send(response);
      } else {
        
        if (!await argon2.verify(user.password_hash, req.body.password)) {
          const response: Response = { type: ResponseType.Error, message: "Incorrect user credentials" };
          res.status(401).send(response);
        } else {
          const token = await authenticationService.createToken(user._id, user.email);
          const response: Response = { type: ResponseType.Error, data: { user, token } };
          res.status(201).send(response);
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

  async verifyToken(req: express.Request, res: express.Response) {
    try {
      if (!req.headers.authorization) {
        res.status(401).send();
        return
      }
      const authorization = req.headers.authorization.split(" ");
      const validation = await authenticationService.validateToken(authorization[1]);
      const token = await authenticationService.createToken(validation.id, validation.email);
      const user = await usersService.readByEmail(validation.email);
      res.status(201).send({ data: { token, user }});
    } catch {
      res.status(403).send({ data: { errors: ["Error during token validation"]}});
    }
  }

  


  
}

export default new AuthenticationController();