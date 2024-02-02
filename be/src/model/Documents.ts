import { Schema, model, Document } from "mongoose";

export interface IDocument extends Document {
  data: unknown;
  userId: string;
  templateId: string;
  title: string;
  margins: number[];
}

const DocumentSchema: Schema = new Schema(
  {
    title: { type: String },
    data: { type: Schema.Types.Mixed },
    userId: { type: String, required: true },
    templateId: { type: String },
    margins: { type: [Number] }
  },
  {
    timestamps: true,
  }
);

export default model<IDocument>("document", DocumentSchema);
