import Colors from "../model/Colors";
import { IColor } from "../types";

export default {
  create: async (payload: IColor) => {
    const { color, ...rest } = payload;
    const newPayload = {
      ...rest,
      colors: [color],
    };
    const response = await Colors.create(newPayload);
    return response;
  },

  findAll: async (documentId: string) => {
    const response = await Colors.find({ documentId }).sort({
      updatedAt: -1,
    });
    return response;
  },

  findByFeature: async (documentId: string, feature: string) => {
    const response = await Colors.find({ documentId, feature }).sort({
      updatedAt: -1,
    });
    return response;
  },

  update: async (id: string, newColor: string) => {
    const response = await Colors.updateOne(
      { _id: id },
      { $addToSet: { colors: [newColor] } }
    );
    return response;
  },
};
