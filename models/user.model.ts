import { Schema, model } from 'mongoose';

interface User {
  first_name: string,
  last_name: string,
  email: string, 
  password_hash: string,
  display_name?: string
}

interface PutUser extends User {
  id: string
}

interface PatchUser extends Partial<PutUser> {};

const schema = new Schema<User>({
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  email: { type: String, required: true },
  password_hash: { type: String, required: true },
  display_name: String,
});

const UserModel = model<User>('User', schema);

export { UserModel, User, PutUser, PatchUser };