import { QRConfigurationModel, QRConfiguration, PutQRConfiguration, PatchQRConfiguration } from '../models/qrconfiguration.model'
import { CRUD } from '../common/crud.interface';

class QRConfigurationService implements CRUD {

  async list(limit?: number, page?: number): Promise<any> {
    return QRConfigurationModel.find();
  }

  async putById(id: string, data: PutQRConfiguration): Promise<any> {
    return QRConfigurationModel.findOneAndUpdate({ _id: id }, data);
  }

  async readById(id: string): Promise<any> {
    return QRConfigurationModel.findById(id);
  }

  async readByOwnerId(id: string): Promise<any> {
    return QRConfigurationModel.find({ owner_id: id });
  }

  async deleteById(id: string): Promise<any> {
    return QRConfigurationModel.findByIdAndDelete(id);
  }

  async patchById(id: string, data: PatchQRConfiguration): Promise<any> {
    return QRConfigurationModel.findOneAndUpdate({ _id: id }, data);
  }

  async create(data: QRConfiguration): Promise<any> {
    return QRConfigurationModel.create(data);
  }

}

export default new QRConfigurationService();