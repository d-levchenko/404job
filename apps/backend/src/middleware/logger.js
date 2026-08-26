import pinoHttp from 'pino-http';

export const logger = pinoHttp({
  transport:
    process.env.NODE_ENV === 'development'
      ? {
          target: 'pino-pretty',
          options: {
            colorize: true,
            translateTime: 'HH:MM:ss',
            ignore: 'pid,hostname',
            hideObject: true,
            messageFormat:
              '{req.method} {req.url} {res.statusCode} - {responseTime}ms',
          },
        }
      : undefined,
});
