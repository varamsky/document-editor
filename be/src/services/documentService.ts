import mongoose from "mongoose";
import logger from "../logger";
import colorRepository from "../repositories/colorRepository";
import documentRepository from "../repositories/documentRepository";
import templateRepository from "../repositories/templateRepository";
import versionRepository from "../repositories/versionRepository";
import {
  IColor,
  TCreateTemplate,
  TDocument,
  TRestoreVersion,
  TVersionDocument,
} from "../types";

export const createDocument = async (data: TDocument) => {
  try {
    const { templateId, userId, title, margins } = data;

    if (templateId) {
      const Template = await templateRepository.findById(templateId);
      if (!Template) {
        return {
          status: 0,
          statusCode: 404,
          message: "Template not found.",
        };
      }

      const document = await documentRepository.createDocFromTemplate(
        title || Template.title,
        Template.data,
        Template._id,
        userId,
        margins
      );

      if (document) {
        return {
          status: true,
          data: document,
        };
      } else {
        return {
          status: 0,
          statusCode: 400,
          message: "Failed to create document.",
        };
      }
    } else {
      if (!data.title) {
        data.title = "Untitled Document";
      }
      const documentId = await documentRepository.createDoc(data);
      if (documentId) {
        return {
          status: true,
          data: documentId,
        };
      } else {
        return {
          status: 0,
          statusCode: 400,
          message: "Failed to create document.",
        };
      }
    }
  } catch (error: unknown) {
    logger.error(`Error in createDocument service : `, error);
    return { status: false, message: (error as Error).message };
  }
};

export const createVersion = async (payload: TVersionDocument) => {
  try {
    const { documentId } = payload;
    const documents = await documentRepository.findById(documentId);

    if (documents) {
      const documentVersionToBeCreated = await versionRepository.create({
        documentId: documents._id,
        data: documents.data,
      });
      if (documentVersionToBeCreated._id) {
        return { status: true, data: documentVersionToBeCreated };
      }

      return {
        status: 2,
        statusCode: 400,
        message: "Document creation failed!",
      };
    } else {
      return {
        status: 2,
        statusCode: 400,
        message: "Document creation failed!",
      };
    }
  } catch (error: unknown) {
    logger.error(`Error in saveDocument service : `, error);
    return { status: false, message: (error as Error).message };
  }
};

export const getUserDocument = async (userId: string) => {
  try {
    const documents = await documentRepository.findAll(userId);
    if (documents) {
      return { status: true, data: documents };
    } else {
      return {
        status: 2,
        statusCode: 404,
        message: "Document not found.",
      };
    }
  } catch (error: unknown) {
    logger.error(`Error in getUserDocument service : `, error);
    return { status: false, message: (error as Error).message };
  }
};

export const getAllVersions = async (id: string) => {
  try {
    if (id && !mongoose.Types.ObjectId.isValid(id)) {
      return {
        status: 2,
        statusCode: 400,
        message: "Invalid Version id format.",
      };
    }
    const documents = await versionRepository.findByDocId(id);

    if (documents) {
      return { status: true, data: documents };
    } else {
      return {
        status: 2,
        statusCode: 404,
        message: "Version not found.",
      };
    }
  } catch (error: unknown) {
    logger.error(`Error in getAllVersions service : `, error);
    return { status: false, message: (error as Error).message };
  }
};

export const getVersionData = async (id: string) => {
  try {
    if (id && !mongoose.Types.ObjectId.isValid(id)) {
      return {
        status: 2,
        statusCode: 400,
        message: "Invalid Version id format.",
      };
    }
    const versionData = await versionRepository.findById(id);
    if (versionData) {
      return { status: true, data: versionData };
    } else {
      return {
        status: 2,
        statusCode: 404,
        message: "Version data not found.",
      };
    }
  } catch (error: unknown) {
    logger.error(`Error in getVersionData service : `, error);
    return { status: false, message: (error as Error).message };
  }
};

export const restoreVersion = async (requestData: TRestoreVersion) => {
  try {
    const { documentId, versionId } = requestData;
    const versionData = await versionRepository.findById(versionId);
    if (!versionData) {
      throw new Error("No version Data found");
    }
    const document = await documentRepository.update(documentId, {
      data: versionData.data,
    });

    if (document) {
      await versionRepository.create({ documentId, data: versionData.data });
      return { status: true };
    } else {
      return {
        status: 2,
        statusCode: 400,
        message: "Failed to restore version.",
      };
    }
  } catch (error: unknown) {
    logger.error(`Error in restoreVersion service : `, error);
    return { status: false, message: (error as Error).message };
  }
};

export const createTemplate = async (payload: TCreateTemplate) => {
  try {
    const documentId = await templateRepository.createTemplate(payload);
    if (documentId) {
      return {
        status: true,
        data: documentId,
      };
    }
    return {
      status: 2,
      statusCode: 400,
      message: "Failed to create template",
    };
  } catch (error: unknown) {
    logger.error(`Error in createTemplate service : `, error);
    return { status: false, message: (error as Error).message };
  }
};

export const getTemplate = async () => {
  try {
    const templates = await templateRepository.findAll();
    if (templates) {
      return {
        status: true,
        data: templates,
      };
    }
    return {
      status: 2,
      statusCode: 404,
      message: "Tempate not found",
    };
  } catch (error: unknown) {
    logger.error(`Error in getTemplate service : `, error);
    return { status: false, message: (error as Error).message };
  }
};

export const updateTitle = async (documentId: string, title: string) => {
  try {
    if (documentId && !mongoose.Types.ObjectId.isValid(documentId)) {
      return {
        status: 2,
        statusCode: 400,
        message: "Invalid document id format.",
      };
    }
    const document = await documentRepository.findById(documentId);
    if (!document) {
      return {
        status: 2,
        statusCode: 404,
        message: "Document not found.",
      };
    }

    const updatedDocument = await documentRepository.updateTitle(
      documentId,
      title
    );

    if (updatedDocument.acknowledged && updatedDocument.modifiedCount === 1) {
      logger.info(`Document updated successfully.`);
      return { status: true };
    } else {
      logger.info(`Document updation failed.`);
      return {
        status: 2,
        statusCode: 400,
        message: "Document updation failed.",
      };
    }
  } catch (error: unknown) {
    logger.error(`Error in updateTitle service : `, error);
    return { status: false, message: (error as Error).message };
  }
};

export const updateImage = async (templateId: string, image: string) => {
  try {
    if (templateId && !mongoose.Types.ObjectId.isValid(templateId)) {
      return {
        status: 2,
        statusCode: 400,
        message: "Invalid template id format.",
      };
    }
    const template = await templateRepository.findById(templateId);
    if (!template) {
      return {
        status: 2,
        statusCode: 404,
        message: "template not found.",
      };
    }

    const updatedTemplate = await templateRepository.updateImage(
      templateId,
      image
    );

    if (updatedTemplate.acknowledged && updatedTemplate.modifiedCount === 1) {
      logger.info(`Template updated successfully.`);
      return { status: true };
    } else {
      logger.info(`Template updation failed.`);
      return {
        status: 2,
        statusCode: 400,
        message: "Template updation failed.",
      };
    }
  } catch (error: unknown) {
    logger.error(`Error in updateTemplate service : `, error);
    return { status: false, message: (error as Error).message };
  }
};

export const removeDoc = async (documentId: string) => {
  try {
    if (documentId && !mongoose.Types.ObjectId.isValid(documentId)) {
      return {
        status: 2,
        statusCode: 400,
        message: "Invalid document id format.",
      };
    }

    const deleteAllVersionsResponse = await versionRepository.deleteByDocId(
      documentId
    );
    if (!deleteAllVersionsResponse) {
      return {
        status: 2,
        statusCode: 404,
        message: "Error in deleting versions for the document.",
      };
    }

    const document = await documentRepository.removeById(documentId);
    if (!document) {
      return {
        status: 2,
        statusCode: 404,
        message: "Document not found.",
      };
    }
    return { status: true };
  } catch (error: unknown) {
    logger.error(`Error in updateTemplate service : `, error);
    return { status: false, message: (error as Error).message };
  }
};

export const createColor = async (payload: IColor) => {
  try {
    const { documentId, feature, color } = payload;
    const colorDocument = await colorRepository.findByFeature(
      documentId,
      feature
    );
    if (colorDocument.length > 0 && feature === colorDocument[0].feature) {
      // Update the existing color document
      const id = colorDocument[0]._id.toString();
      const updateColorDocument = await colorRepository.update(id, color);
      if (updateColorDocument) {
        return { status: true };
      } else {
        return {
          status: 2,
          statusCode: 400,
          message: "Failed to update colors",
        };
      }
    } else {
      // Create new Color Document
      const createColorDocument = await colorRepository.create(payload);
      if (createColorDocument) {
        return { status: true, data: createColorDocument };
      } else {
        return {
          status: 2,
          statusCode: 400,
          message: "Failed to create colors",
        };
      }
    }
  } catch (error: unknown) {
    logger.error(`Error in createColor service : `, error);
    return { status: false, message: (error as Error).message };
  }
};

export const retrieveAllColor = async (documentId: string) => {
  try {
    if (documentId && !mongoose.Types.ObjectId.isValid(documentId)) {
      return {
        status: 2,
        statusCode: 400,
        message: "Invalid document id format.",
      };
    }
    const documents = await colorRepository.findAll(documentId);
    if (documents) {
      return { status: true, data: documents };
    } else {
      return {
        status: 2,
        statusCode: 400,
        message: "Failed to retrieve records.",
      };
    }
  } catch (error: unknown) {
    logger.error(`Error in retrieveAllColor service : `, error);
    return { status: false, message: (error as Error).message };
  }
};

export const updateMargins = async (documentId: string, margins: number[]) => {
  try {
    if (documentId && !mongoose.Types.ObjectId.isValid(documentId)) {
      return {
        status: 2,
        statusCode: 400,
        message: "Invalid document id format.",
      };
    }
    const document = await documentRepository.findById(documentId);
    if (!document) {
      return {
        status: 2,
        statusCode: 404,
        message: "Document not found.",
      };
    }

    const updatedDocument = await documentRepository.updateMargins(
      documentId,
      margins
    );

    if (updatedDocument.acknowledged && updatedDocument.modifiedCount === 1) {
      logger.info(`Document updated successfully.`);
      return { status: true };
    } else {
      logger.info(`Document updation failed.`);
      return {
        status: 2,
        statusCode: 400,
        message: "Document updation failed.",
      };
    }
  } catch (error: unknown) {
    logger.error(`Error in updateMargins service : `, error);
    return { status: false, message: (error as Error).message };
  }
};
