import { Schema, model, Document } from "mongoose";

export interface ITemplate extends Document {
  data: unknown;
  userId: string;
  title: string;
  image?: string;
}

const TemplateSchema: Schema = new Schema(
  {
    title: { type: String },
    data: { type: Schema.Types.Mixed, required: true },
    userId: { type: String, required: true },
    image: { type: String },
  },
  {
    timestamps: true,
  }
);

export default model<ITemplate>("template", TemplateSchema);
