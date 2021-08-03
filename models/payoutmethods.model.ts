import { Schema, model } from 'mongoose';

type ReceiverType = "user" | "team";

interface PayoutMethods {
  owner_id: string,
  receiver_type: ReceiverType,
  stripe_id: string
}

interface PutPayoutMethods extends PayoutMethods {
  _id: string
}

interface PatchPayoutMethods extends Partial<PutPayoutMethods> {};

const schema = new Schema<PayoutMethods>({
  owner_id: { type: String, required: true },
  receiver_type: { type: String, required: true },
  stripe_id: { type: String }
});

const PayoutMethodsModel = model<PayoutMethods>('PayoutMethods', schema);

export { PayoutMethodsModel, PayoutMethods, PutPayoutMethods, PatchPayoutMethods };