import { PayoutMethodsModel, PayoutMethods, PutPayoutMethods, PatchPayoutMethods } from '../models/payoutmethods.model'
import { CRUD } from '../common/crud.interface';

class PayoutMethodsService {

  async list(limit?: number, page?: number): Promise<any> {
    return PayoutMethodsModel.find();
  }

  async putById(id: string, ownerType: string, data: PutPayoutMethods): Promise<any> {
    return PayoutMethodsModel.findOneAndUpdate({ _id: id }, data);
  }

  async readById(id: string, ownerType: string): Promise<any> {
    return PayoutMethodsModel.findOne({ owner_id: id, owner_type: ownerType });
  }

  async deleteById(id: string, ownerType: string): Promise<any> {
    return PayoutMethodsModel.findOneAndDelete({ owner_id: id, owner_type: ownerType });
  }

  async patchById(id: string, ownerType: string, data: PatchPayoutMethods): Promise<any> {
    return PayoutMethodsModel.findOneAndUpdate({ owner_id: id, owner_type: ownerType }, data);
  }

  async create(data: PayoutMethods): Promise<any> {
    return PayoutMethodsModel.create(data);
  }

}

export default new PayoutMethodsService();