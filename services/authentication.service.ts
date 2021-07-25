import jwt from 'jsonwebtoken';

class AuthenticationService {

  async createToken(id: string, email: string): Promise<any> {
    return jwt.sign(
      { id, email },
      process.env.TOKEN_KEY as string,
      {
        expiresIn: "2h",
      }
    );
  }

  async validateToken(token: string): Promise<any> {
    return jwt.verify(token, process.env.TOKEN_KEY as string);
  }
 

}

export default new AuthenticationService();