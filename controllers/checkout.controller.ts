import express from "express";
import { Response, ResponseType } from '../common/response.interface';
import argon2 from 'argon2';

class AuthenticationController {

  async createCheckoutSession(req: express.Request, res: express.Response) {
    try {
      const receiverId = req.body.receiverId;
      const amount = req.body.amount;


      const response: Response = { type: ResponseType.Error, data: { user, token } };
      res.status(201).send(response);
    } catch (error) {
      const response: Response = { type: ResponseType.Error, message: "Sorry, there was an error when registering" };
      res.status(401).send(response);
    }
  }

  

  


  
}

export default new AuthenticationController();