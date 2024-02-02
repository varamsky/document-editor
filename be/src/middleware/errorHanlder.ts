import { ErrorRequestHandler } from "express";

export const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }
  res
    .status(err.statusCode || 500)
    .json({ success: false, error: err.message || "Internal Server Error." });
};
