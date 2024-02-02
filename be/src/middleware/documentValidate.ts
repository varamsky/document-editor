import { body } from 'express-validator';

export const validateCreateDocument = [
  body('userId').not().isEmpty().withMessage('User id is required'),
  body('templateId')
    .custom((value, { req }) => {
      // Allow empty string, and validate if it is present
      if (value !== undefined && value !== '') {
        if (!value.match(/^[0-9a-fA-F]{24}$/)) {
          throw new Error('Invalid template id format.');
        }
      }
      return true; // Validation passed
    })
    .withMessage('Invalid template id format.'),
];

export const validateRestoreVersion = [
  body('documentId').not().isEmpty().withMessage('Document id is required'),
  body('documentId')
    .custom((value, { req }) => {
      // Allow empty string, and validate if it is present
      if (value !== undefined && value !== '') {
        if (!value.match(/^[0-9a-fA-F]{24}$/)) {
          throw new Error('Invalid document id format.');
        }
      }
      return true; // Validation passed
    })
    .withMessage('Invalid document id format.'),
  body('versionId').not().isEmpty().withMessage('Version id is required'),
  body('versionId')
    .custom((value, { req }) => {
      // Allow empty string, and validate if it is present
      if (value !== undefined && value !== '') {
        if (!value.match(/^[0-9a-fA-F]{24}$/)) {
          throw new Error('Invalid version id format.');
        }
      }
      return true; // Validation passed
    })
    .withMessage('Invalid version id format.'),
];

export const validateCreateTemplate = [
  body('userId').not().isEmpty().withMessage('User id is required'),
  body('title').not().isEmpty().withMessage('Title is required'),
];

export const validateCreateVersion = [
  body('documentId').not().isEmpty().withMessage('Document id is required'),
  body('documentId')
    .custom((value, { req }) => {
      // Allow empty string, and validate if it is present
      if (value !== undefined && value !== '') {
        if (!value.match(/^[0-9a-fA-F]{24}$/)) {
          throw new Error('Invalid document id format.');
        }
      }
      return true; // Validation passed
    })
    .withMessage('Invalid document id format.'),
];

export const validateUpdateTitle = [
  body('title').not().isEmpty().withMessage('Title is required'),
];

export const validateCreateColor = [
  body('documentId').not().isEmpty().withMessage('Document id is required'),
  body('documentId')
    .custom((value, { req }) => {
      // Allow empty string, and validate if it is present
      if (value !== undefined && value !== '') {
        if (!value.match(/^[0-9a-fA-F]{24}$/)) {
          throw new Error('Invalid document id format.');
        }
      }
      return true; // Validation passed
    })
    .withMessage('Invalid document id format.'),
  body('feature').not().isEmpty().withMessage('Feature is required'),
  body('color').not().isEmpty().withMessage('Color is required'),
];

export const validateUpdateMargins = [
  body('margins').not().isEmpty().withMessage('Margins is required'),
];
