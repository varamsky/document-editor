import { RequestHandler } from 'express';
import createHttpError from 'http-errors';
import logger from '../logger';
import {
  createDocument,
  getUserDocument,
  getAllVersions,
  restoreVersion,
  createTemplate,
  getTemplate,
  createVersion,
  getVersionData,
  updateTitle,
  updateImage,
  removeDoc,
  createColor,
  retrieveAllColor,
  updateMargins,
} from '../services/documentService';
import { getDocumentById } from '../services/socketServices';
import {
  validateCreateColor,
  validateCreateDocument,
  validateCreateTemplate,
  validateCreateVersion,
  validateRestoreVersion,
  validateUpdateMargins,
  validateUpdateTitle,
} from '../middleware/documentValidate';
import { validationResult } from 'express-validator';

export const documentController: RequestHandler = async (req, res, next) => {
  try {
    // Run validation middleware
    await Promise.all(
      validateCreateDocument.map((validation) => validation.run(req))
    );

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const errorMessages = errors
        .array()
        .map((error: any) => ({ [error.path]: error.msg }));
      return res.status(422).json({ errors: errorMessages });
    }
    const response = await createDocument(req.body);
    if (response.status === true) {
      res.status(201).json({
        success: true,
        message: 'Document created successfully.',
        data: response.data,
      });
    } else {
      logger.error(`Error in documentController : `, response);
      if (response && response.status === 0) {
        return next(createHttpError(response.statusCode, response.message));
      }
      next(createHttpError(500, ''));
    }
  } catch (error: unknown) {
    logger.error(`Error in documentController catch : `, error);
    next(createHttpError(500, (error as Error).message));
  }
};

export const getUserDocumentController: RequestHandler = async (
  req,
  res,
  next
) => {
  try {
    const { userId } = req.params;
    const response = await getUserDocument(userId);
    const { status, data } = response;
    if (status === true) {
      res.status(200).json({
        success: true,
        message:
          data?.length === 0
            ? `No records found.`
            : 'Records retrieved successfully.',
        total: data?.length,
        data,
      });
    } else {
      logger.error(`Error in getUserDocumentController : `, response);
      if (response && response.status === 2) {
        return next(createHttpError(response.statusCode, response.message));
      }
      next(createHttpError(500, ''));
    }
  } catch (error: unknown) {
    logger.error(`Error in getUserDocumentController catch : `, error);
    next(createHttpError(500, (error as Error).message));
  }
};

export const getAllVersionController: RequestHandler = async (
  req,
  res,
  next
) => {
  try {
    const { id } = req.params;
    const response = await getAllVersions(id);

    const { status, data } = response;
    if (status === true) {
      res.status(200).json({
        success: true,
        message:
          data?.length === 0
            ? `No records found.`
            : 'Records retrieved successfully.',
        total: data?.length,
        data,
      });
    } else {
      logger.error(`Error in getAllVersionController : `, response);
      if (response && response.status === 2) {
        return next(createHttpError(response.statusCode, response.message));
      }
      next(createHttpError(500, ''));
    }
  } catch (error: unknown) {
    logger.error(`Error in getAllVersionController catch : `, error);
    next(createHttpError(500, (error as Error).message));
  }
};

export const getVersionDataController: RequestHandler = async (
  req,
  res,
  next
) => {
  try {
    const { versionId } = req.params;
    const response = await getVersionData(versionId);

    const { status, data } = response;
    if (status === true) {
      res.status(200).json({
        success: true,
        message: 'Version Data retreived successfully',
        data,
      });
    } else {
      logger.error(`Error in getVersionDataController : `, response);
      if (response && response.status === 2) {
        return next(createHttpError(response.statusCode, response.message));
      }
      next(createHttpError(500, ''));
    }
  } catch (error: unknown) {
    logger.error(`Error in getVersionDataController catch : `, error);
    next(createHttpError(500, (error as Error).message));
  }
};

export const restoreVersionController: RequestHandler = async (
  req,
  res,
  next
) => {
  try {
    // Run validation middleware
    await Promise.all(
      validateRestoreVersion.map((validation) => validation.run(req))
    );

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const errorMessages = errors
        .array()
        .map((error: any) => ({ [error.path]: error.msg }));
      return res.status(422).json({ errors: errorMessages });
    }
    const response = await restoreVersion(req.body);

    const { status } = response;
    if (status === true) {
      res.status(200).json({
        success: status,
        message: 'Version restored successfully.',
      });
    } else {
      logger.error(`Error in restoreVersionController : `, response);
      if (response && response.status === 2) {
        return next(createHttpError(response.statusCode, response.message));
      }
      next(createHttpError(500, ''));
    }
  } catch (error: unknown) {
    logger.error(`Error in restoreVersionController catch : `, error);
    next(createHttpError(500, (error as Error).message));
  }
};

export const createTemplateController: RequestHandler = async (
  req,
  res,
  next
) => {
  try {
    // Run validation middleware
    await Promise.all(
      validateCreateTemplate.map((validation) => validation.run(req))
    );

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const errorMessages = errors
        .array()
        .map((error: any) => ({ [error.path]: error.msg }));
      return res.status(422).json({ errors: errorMessages });
    }
    const response = await createTemplate(req.body);

    const { status, data } = response;
    if (status === true) {
      res.status(200).json({
        success: true,
        message: 'Template created successfully.',
        data: data,
      });
    } else {
      logger.error(`Error in createTemplateController : `, response);
      if (response && response.status === 2) {
        return next(createHttpError(response.statusCode, response.message));
      }
      next(createHttpError(500, ''));
    }
  } catch (error: unknown) {
    logger.error(`Error in createTemplateController catch : `, error);
    next(createHttpError(500, (error as Error).message));
  }
};

export const getTemplateController: RequestHandler = async (req, res, next) => {
  try {
    const response = await getTemplate();

    const { status, data } = response;
    if (status === true) {
      res.status(200).json({
        success: true,
        message: 'Template created successfully.',
        data: data,
      });
    } else {
      logger.error(`Error in getTemplateController : `, response);
      if (response && response.status === 2) {
        return next(createHttpError(response.statusCode, response.message));
      }
      next(createHttpError(500, ''));
    }
  } catch (error: unknown) {
    logger.error(`Error in getTemplateController catch : `, error);
    next(createHttpError(500, (error as Error).message));
  }
};

export const createVersionController: RequestHandler = async (
  req,
  res,
  next
) => {
  try {
    // Run validation middleware
    await Promise.all(
      validateCreateVersion.map((validation) => validation.run(req))
    );

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const errorMessages = errors
        .array()
        .map((error: any) => ({ [error.path]: error.msg }));
      return res.status(422).json({ errors: errorMessages });
    }
    const response = await createVersion(req.body);

    const { status, data } = response;
    if (status === true) {
      res.status(200).json({
        success: true,
        message: 'Version created successfully.',
        data: data,
      });
    } else {
      logger.error(`Error in createVersionController : `, response);
      if (response && response.status === 2) {
        return next(createHttpError(response.statusCode, response.message));
      }
      next(createHttpError(500, ''));
    }
  } catch (error: unknown) {
    logger.error(`Error in createVersionController catch : `, error);
    next(createHttpError(500, (error as Error).message));
  }
};

export const getDocumentController: RequestHandler = async (req, res, next) => {
  try {
    const { documentId } = req.params;
    const response = await getDocumentById(documentId);

    if (response.status === true) {
      res.status(201).json({
        success: true,
        message: 'Document loaded successfully.',
        data: response.data,
      });
    } else {
      logger.error(`Error in getDocumentController : `, response);
      if (response && response.status === 2) {
        return next(createHttpError(response.statusCode, response.message));
      }
      next(createHttpError(500, ''));
    }
  } catch (error: unknown) {
    logger.error(`Error in getDocumentController catch : `, error);
    next(createHttpError(500, (error as Error).message));
  }
};

export const UpdateTitleController: RequestHandler = async (req, res, next) => {
  try {
    const { documentId } = req.params;
    const { title } = req.body;
    // Run validation middleware
    await Promise.all(
      validateUpdateTitle.map((validation) => validation.run(req))
    );

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const errorMessages = errors
        .array()
        .map((error: any) => ({ [error.path]: error.msg }));
      return res.status(422).json({ errors: errorMessages });
    }
    const response = await updateTitle(documentId, title);

    if (response.status === true) {
      res.status(200).json({
        success: true,
        message: 'Title updated successfully.',
      });
    } else {
      logger.error(`Error in UpdateTitleController : `, response);
      if (response && response.status === 2) {
        return next(createHttpError(response.statusCode, response.message));
      }
      next(createHttpError(500, ''));
    }
  } catch (error: unknown) {
    logger.error(`Error in UpdateTitleController catch : `, error);
    next(createHttpError(500, (error as Error).message));
  }
};

export const updateTemplateImageController: RequestHandler = async (
  req,
  res,
  next
) => {
  try {
    const { templateId } = req.params;
    const { image } = req.body;
    const response = await updateImage(templateId, image);

    if (response.status === true) {
      res.status(200).json({
        success: true,
        message: 'Image updated successfully.',
      });
    } else {
      logger.error(`Error in updateTemplateImageController : `, response);
      if (response && response.status === 2) {
        return next(createHttpError(response.statusCode, response.message));
      }
      next(createHttpError(500, ''));
    }
  } catch (error: unknown) {
    logger.error(`Error in updateTemplateImageController catch : `, error);
    next(createHttpError(500, (error as Error).message));
  }
};

export const removeDocController: RequestHandler = async (req, res, next) => {
  try {
    const { documentId } = req.params;
    const response = await removeDoc(documentId);

    if (response.status === true) {
      res.status(200).json({
        success: true,
        message: 'Record removed successfully.',
      });
    } else {
      logger.error(`Error in removeDocController : `, response);
      if (response && response.status === 2) {
        return next(createHttpError(response.statusCode, response.message));
      }
      next(createHttpError(500, ''));
    }
  } catch (error: unknown) {
    logger.error(`Error in removeDocController catch : `, error);
    next(createHttpError(500, (error as Error).message));
  }
};

export const createColorController: RequestHandler = async (req, res, next) => {
  try {
    // Run validation middleware
    await Promise.all(
      validateCreateColor.map((validation) => validation.run(req))
    );

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const errorMessages = errors
        .array()
        .map((error: any) => ({ [error.path]: error.msg }));
      return res.status(422).json({ errors: errorMessages });
    }
    const response = await createColor(req.body);

    if (response.status === true) {
      res.status(201).json({
        success: true,
        message: 'Color created successfully.',
        data: response.data,
      });
    } else {
      logger.error(`Error in createColorController : `, response);
      if (response && response.status === 2) {
        return next(createHttpError(response.statusCode, response.message));
      }
      next(createHttpError(500, ''));
    }
  } catch (error: unknown) {
    logger.error(`Error in createColorController catch : `, error);
    next(createHttpError(500, (error as Error).message));
  }
};

export const retrieveColorController: RequestHandler = async (
  req,
  res,
  next
) => {
  try {
    const { documentId } = req.params;
    const response = await retrieveAllColor(documentId);
    const { status, data } = response;
    if (status === true) {
      res.status(201).json({
        success: true,
        message:
          data?.length === 0
            ? `No records found.`
            : 'Records retrieved successfully.',
        total: data?.length,
        data,
      });
    } else {
      logger.error(`Error in retrieveColorController : `, response);
      if (response && response.status === 2) {
        return next(createHttpError(response.statusCode, response.message));
      }
      next(createHttpError(500, ''));
    }
  } catch (error: unknown) {
    logger.error(`Error in retrieveColorController catch : `, error);
    next(createHttpError(500, (error as Error).message));
  }
};

export const UpdateMarginsController: RequestHandler = async (
  req,
  res,
  next
) => {
  try {
    const { documentId } = req.params;
    const { margins } = req.body;
    // Run validation middleware
    await Promise.all(
      validateUpdateMargins.map((validation) => validation.run(req))
    );

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const errorMessages = errors
        .array()
        .map((error: any) => ({ [error.path]: error.msg }));
      return res.status(422).json({ errors: errorMessages });
    }
    const response = await updateMargins(documentId, margins);

    if (response.status === true) {
      res.status(200).json({
        success: true,
        message: 'Margins updated successfully.',
      });
    } else {
      logger.error(`Error in UpdateMarginsController : `, response);
      if (response && response.status === 2) {
        return next(createHttpError(response.statusCode, response.message));
      }
      next(createHttpError(500, ''));
    }
  } catch (error: unknown) {
    logger.error(`Error in UpdateMarginsController catch : `, error);
    next(createHttpError(500, (error as Error).message));
  }
};
