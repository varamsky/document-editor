import mongoose from 'mongoose';
import logger from '../logger';
import documentRepository from '../repositories/documentRepository';
import { TUpdateDocumentBySocket } from '../types';

export const getDocumentById = async (id: string) => {
  try {
    if (id && !mongoose.Types.ObjectId.isValid(id)) {
      return {
        status: 2,
        statusCode: 400,
        message: 'Invalid document id format.',
      };
    }
    const document = await documentRepository.findById(id);
    if (document) {
      return {
        status: true,
        data: document,
      };
    }
    return {
      status: 2,
      statusCode: 400,
      message: 'Document not found.',
    };
  } catch (error: unknown) {
    logger.error(`Error in getDocumentById service : `, error);
    return { status: false, message: (error as Error).message };
  }
};

export const updateDocumentById = async (payload: TUpdateDocumentBySocket) => {
  try {
    const { id, data, title } = payload;
    // filter repated image which has width, height are 0
    if (Array.isArray(data)) {
      const removedRepeatImages = data.filter((item: any) => {
        if (!(item.type === 'image' && item.width === 0 && item.height === 0)) {
          return {
            ...item,
          };
        }
      });
      const document = await documentRepository.update(id, {
        data: removedRepeatImages,
        title,
      });
      if (document.acknowledged && document.modifiedCount === 1) {
        logger.info(`Document updated successfully.`);
      } else {
        logger.info(`Document updation failed.`);
      }
    }
  } catch (error: unknown) {
    logger.error(`Error in updateDocumentById service : `, error);
  }
};
