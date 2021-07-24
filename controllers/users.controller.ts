import express from "express";
import UsersService from '../services/users.service';
import mongoose, { model } from "mongoose";
import { User, UserModel } from '../models/user.model';
import debug from 'debug';

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
      res.status(201).send(users);
    } catch {
      res.status(401).send('Error retrieving users');
    }
  }
  
}

export default new UsersController();