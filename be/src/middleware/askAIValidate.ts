import { body } from 'express-validator';

export const validateAskAIRephrase = [
  body('text').not().isEmpty().withMessage('Text is required'),
];

export const validateAskAIGrammar = [
  body('text').not().isEmpty().withMessage('Text is required'),
];

export const validateAskAITone = [
  body('text').not().isEmpty().withMessage('Text is required'),
  body('tone').not().isEmpty().withMessage('Tone is required'),
];
