import { Schema, model } from 'mongoose';

type OwnerType = "user" | "team";
type QRStyle = "default" | "arrow" | "circle" | "classic" | "heavyround" | "lightround" | "sieve";
type QREyeStyle = "circle" | "cushion" | "default" | "diamond" | "dots" | "heavyround" | "leaf" | "leaf_eye" | "right_eye" | "shield" | "sieve" | "star";


interface QRConfiguration {
  owner_id: string,
  owner_type: OwnerType,
  nickname: string,
  qr_style: QRStyle, 
  qr_inner_eye_style: QREyeStyle, 
  qr_outer_eye_style: QREyeStyle, 
  qr_colour: string,
  qr_inner_eye_colour: string,
  qr_outer_eye_colour: string,
  bg_colour: string,
  created_on: Date
}

interface PutQRConfiguration extends QRConfiguration {
  _id: string
}

interface PatchQRConfiguration extends Partial<PutQRConfiguration> {};

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

const QRConfigurationModel = model<QRConfiguration>('QRConfiguration', schema);

export { QRConfigurationModel, QRConfiguration, PutQRConfiguration, PatchQRConfiguration };