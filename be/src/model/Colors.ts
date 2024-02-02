import { Schema, model, Document } from "mongoose";
import { IDocument } from "./Documents";

export interface IColor extends Document {
  documentId: IDocument["_id"];
  feature: string;
  colors: string[];
}

const ColorSchema: Schema = new Schema({
  documentId: { type: Schema.Types.ObjectId, ref: "document", require: true },
  feature: { type: String, required: true },
  colors: { type: [String], required: true },
});

export default model<IColor>("color", ColorSchema);
