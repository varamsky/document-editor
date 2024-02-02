import Templates from "../model/Templates";
import { TCreateTemplate } from "../types";

export default {
  createTemplate: async (payload: TCreateTemplate) => {
    const { data, userId, title } = payload;
    const response = await Templates.create({
      data,
      userId,
      title,
    });
    return response._id;
  },

  findAll: async () => {
    const response = await Templates.find();
    return response;
  },

  findById: async (id: string) => {
    const response = await Templates.findOne({ _id: id });
    return response;
  },

  updateImage: async (id: string, image: string) => {
    const response = await Templates.updateOne(
      { _id: id },
      { image },
      { upsert: false }
    );
    return response;
  },
};
