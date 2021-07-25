import { UserModel, User, PutUser, PatchUser } from '../models/user.model'
import { CRUD } from '../common/crud.interface';

class UsersService implements CRUD {

  async list(limit?: number, page?: number): Promise<any> {
    return UserModel.find();
  }

  async putById(id: string, data: PutUser): Promise<any> {
    return UserModel.findOneAndUpdate({ _id: id }, data);
  }

  async readById(id: string): Promise<any> {
    return UserModel.findById(id);
  }

  async readByEmail(email: string): Promise<any> {
    return UserModel.findOne({ email: email });
  }

  async readByEmailWithPassword(email: string): Promise<any> {
    return UserModel.findOne({ email: email }).select('_id email +password_hash').exec();
  }

  async deleteById(id: string): Promise<any> {
    return UserModel.findByIdAndDelete(id);
  }

  async patchById(id: string, data: PatchUser): Promise<any> {
    return UserModel.findOneAndUpdate({ _id: id }, data);
  }

  async create(data: User): Promise<any> {
    return UserModel.create(data);
  }

}

export default new UsersService();