import Document from "../model/Documents";
import { TDocument, TUpdateDocument } from "../types";

export default {
  createDoc: async (requestData?: TDocument) => {
    const response = await Document.create({
      title: requestData?.title,
      data: requestData?.data || "",
      userId: requestData?.userId,
      templateId: "",
      margins: requestData?.margins || []
    });
    return response._id;
  },

  createDocFromTemplate: async (
    title: string,
    data: unknown,
    templateId: string,
    userId: string,
    margins: number[]
  ) => {
    const response = await Document.create({
      title,
      data,
      templateId,
      userId,
      margins
    });
    return response;
  },

  findById: async (id: string) => {
    const response = await Document.findOne({ _id: id });
    return response;
  },

  removeById: async (id: string) => {
    const response = await Document.deleteOne({ _id: id });
    return response;
  },

  findAll: async (userId: string) => {
    const response = await Document.find({ userId }).sort({ updatedAt: -1 });
    return response;
  },
  update: async (id: string, payload: TUpdateDocument) => {
    const response = await Document.updateOne({ _id: id }, payload, {
      upsert: false,
    });
    return response;
  },

  updateTitle: async (id: string, title: string) => {
    const response = await Document.updateOne(
      { _id: id },
      { title },
      { upsert: false }
    );
    return response;
  },

  updateMargins: async (id: string, margins: number[]) => {
    const response = await Document.updateOne(
      { _id: id },
      { margins },
      { upsert: false }
    );
    return response;
  },
};
