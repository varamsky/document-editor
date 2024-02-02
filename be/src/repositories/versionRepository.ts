import Version from "../model/Versions";
import { TVersionDocument } from "../types";

export default {
  create: async (requestData: TVersionDocument) => {
    const { documentId, data } = requestData;
    const response = await Version.create({
      documentId,
      data,
    });
    return response;
  },

  findByDocId: async (id: string) => {
    const response = await Version.find({ documentId: id })
      .select("-data")
      .sort({ time: -1 });
    return response;
  },

  findById: async (id: string) => {
    const response = await Version.findById(id);
    return response;
  },
};
