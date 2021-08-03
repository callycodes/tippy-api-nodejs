import { Schema, model } from 'mongoose';

type RecieverType = "user" | "team";

interface Tip {
  reciever_type: RecieverType,

  created_on: Date
}

interface PutTip extends Tip {
  _id: string
}

interface PatchTip extends Partial<PutTip> {};

const schema = new Schema<TextStreamReader>({
  owner_id: { type: String, required: true },
  owner_type: { type: String, required: true },
  nickname: { type: String, required: true },
  qr_style: { type: String, default: "default" },
  qr_inner_eye_style: { type: String, default: "default" },
  qr_outer_eye_style: { type: String, default: "default" },
  qr_colour: { type: String, default: "FFFFFF" },
  qr_inner_eye_colour: { type: String, default: "FFFFFF" },
  qr_outer_eye_colour: { type: String, default: "FFFFFF" },
  bg_colour: { type: String, default: "000000" },
  created_on: { type: Date, default: function() {
    return Date.now();
  }}
});

const TipModel = model<Tip>('Tip', schema);

export { TipModel, Tip, PutTip, PatchTip };