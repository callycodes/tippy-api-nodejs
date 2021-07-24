import { UserModel, User } from '../models/user.model'
import { CRUD } from '../common/crud.interface';

class UsersService implements CRUD {

  async list(limit?: number, page?: number): Promise<any> {
    return UserModel.find();
  }

  async putById(id: string, data: User): Promise<any> {
    return UserModel.findByIdAndUpdate(id, data);
  }

  async readById(id: string): Promise<any> {
    return UserModel.findById(id);
  }

  async deleteById(id: string): Promise<any> {
    return UserModel.findByIdAndDelete(id);
  }

  async patchById(id: string, data: any): Promise<any> {
    return UserModel.findByIdAndUpdate(id, data);
  }

  async create(data: User): Promise<any> {
    return UserModel.create(data);
  }

}

export default new UsersService();