import createHttpError from 'http-errors';

export const errorHandler = (error, req, res, next) => {
  if (createHttpError.isHttpError(error)) {
    const status = error.status ?? 500;

    return res.status(status).json({
      message: error.message || error.name,
    });
  }

  req.log?.error(error);

  const isProd = process.env.NODE_ENV === 'production';

  const message = isProd
    ? 'Something went wrong. Please try again later.'
    : error.message || 'Unknown error';

  return res.status(500).json({
    message,
  });
};
