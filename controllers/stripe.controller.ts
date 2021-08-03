import express from "express";
import { Response, ResponseType } from '../common/response.interface';

class StripeController {

  async connectStripeAccount(req: express.Request, res: express.Response) {
    try {

      const stripe = require('stripe')('sk_test_51JKGMaBy5OQJiA25YVmGLm06Bi2m78LqexMkbB0F2Vh8IQJkXx0o9vJgYMuLItMJXp2W4ilbN0cUBdH0XPnsE0lD00lvJDWlvH')
      const receiverEmail = req.body.data.email;
      const country = 'GB';
      
      const account = await stripe.accounts.create({
        type: 'standard',
        country: country,
        email: receiverEmail,
      });
      
      const accountId = account.id;

      console.log('Created user with: ' + accountId);

      const accountLinks = await stripe.accountLinks.create({
        account: accountId,
        refresh_url: 'https://example.com/reauth',
        return_url: 'http://localhost:8080/integration/stripe',
        type: 'account_onboarding',
      });

      console.log('Redirecting user to: ' + accountLinks.url)
      const response: Response = { type: ResponseType.Success, data: { url: accountLinks.url } };
      res.status(201).send(response);
    } catch (error) {
      const response: Response = { type: ResponseType.Error, message: error };
      res.status(401).send(response);
    }
  }

  async getStripeAccount(req: express.Request, res: express.Response) {
    try {

      const stripe = require('stripe')('sk_test_51JKGMaBy5OQJiA25YVmGLm06Bi2m78LqexMkbB0F2Vh8IQJkXx0o9vJgYMuLItMJXp2W4ilbN0cUBdH0XPnsE0lD00lvJDWlvH')
      const accountId = req.params.accountId;

      const account = await stripe.accounts.retrieve(
        accountId
      );

      const response: Response = { type: ResponseType.Success, data: { account } };
      res.status(201).send(response);
    } catch (error) {
      const response: Response = { type: ResponseType.Error, message: error };
      res.status(401).send(response);
    }
  }

  

  


  
}

export default new StripeController();