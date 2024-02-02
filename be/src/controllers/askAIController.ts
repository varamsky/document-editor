import { RequestHandler } from 'express';
import logger from '../logger';
import createHttpError from 'http-errors';
import getCompletion from '../services/askAIService';
import {
  validateAskAIGrammar,
  validateAskAIRephrase,
  validateAskAITone,
} from '../middleware/askAIValidate';
import { validationResult } from 'express-validator';

const askAIRephraseController: RequestHandler = async (req, res, next) => {
  try {
    const { text } = req.body;
    // Run validation middleware
    await Promise.all(
      validateAskAIRephrase.map((validation) => validation.run(req))
    );

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const errorMessages = errors
        .array()
        .map((error: any) => ({ [error.path]: error.msg }));
      return res.status(422).json({ errors: errorMessages });
    }

    const prompt = `Rephrase the text delimited by triple backticks 
    with no grammatical mistakes.
    \`\`\`${text}\`\`\``;

    const response = await getCompletion(prompt);
    if (response.status === true) {
      res.json({
        success: true,
        message: 'Text rephrased successfully.',
        data: response.data
          ? response.data[0].message?.content?.replace(/\//g, '')
          : '',
      });
    } else {
      logger.error(`Error in askAIRephraseController : `, response);
      if (response && response.status === 2) {
        return next(
          createHttpError(response.statusCode || 500, response.message)
        );
      }
      next(createHttpError(500, ''));
    }
  } catch (error: unknown) {
    logger.error(`Error in askAIRephraseController catch : `, error);
    next(createHttpError(500, (error as Error).message));
  }
};

const askAIGrammarController: RequestHandler = async (req, res, next) => {
  try {
    const { text } = req.body;
    // Run validation middleware
    await Promise.all(
      validateAskAIGrammar.map((validation) => validation.run(req))
    );

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const errorMessages = errors
        .array()
        .map((error: any) => ({ [error.path]: error.msg }));
      return res.status(422).json({ errors: errorMessages });
    }

    const prompt = `Correct all grammatical mistakes in the text delimited by triple backticks.
    \`\`\`${text}\`\`\``;

    const response = await getCompletion(prompt);
    if (response.status === true) {
      res.json({
        success: true,
        message: 'Text correction completed.',
        data: response.data
          ? response.data[0].message?.content?.replace(/\//g, '')
          : '',
      });
    } else {
      logger.error(`Error in askAIGrammarController : `, response);
      if (response && response.status === 2) {
        return next(
          createHttpError(response.statusCode || 500, response.message)
        );
      }
      next(createHttpError(500, ''));
    }
  } catch (error: unknown) {
    logger.error(`Error in askAIGrammarController catch : `, error);
    next(createHttpError(500, (error as Error).message));
  }
};

const askAIToneController: RequestHandler = async (req, res, next) => {
  try {
    const { text, tone } = req.body;
    // Run validation middleware
    await Promise.all(
      validateAskAITone.map((validation) => validation.run(req))
    );

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const errorMessages = errors
        .array()
        .map((error: any) => ({ [error.path]: error.msg }));
      return res.status(422).json({ errors: errorMessages });
    }

    const prompt = `Transform the tone of the text delimited by triple backticks 
    to ${tone} with no grammatical mistakes.
    \`\`\`${text}\`\`\``;

    const response = await getCompletion(prompt);
    if (response.status === true) {
      res.json({
        success: true,
        message: 'Tone changed successfully.',
        data: response.data
          ? response.data[0].message?.content?.replace(/\//g, '')
          : '',
      });
    } else {
      logger.error(`Error in askAIToneController : `, response);
      if (response && response.status === 2) {
        return next(
          createHttpError(response.statusCode || 500, response.message)
        );
      }
      next(createHttpError(500, ''));
    }
  } catch (error: unknown) {
    logger.error(`Error in askAIToneController catch : `, error);
    next(createHttpError(500, (error as Error).message));
  }
};

export default {
  askAIRephraseController,
  askAIGrammarController,
  askAIToneController,
};
