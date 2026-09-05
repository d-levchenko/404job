import { Joi, Segments } from 'celebrate';

export const updateCandidateSchema = {
  [Segments.BODY]: Joi.object({
    name: Joi.string().trim().min(2).max(100),

    githubUrl: Joi.string().uri().allow('', null),

    linkedinUrl: Joi.string().uri().allow('', null),

    behanceUrl: Joi.string().uri().allow('', null),
  })
    .min(1)
    .messages({
      'object.min': 'At least one field must be provided',
    }),
};

export const updateEmployerSchema = {
  [Segments.BODY]: Joi.object({
    companyName: Joi.string().trim().min(2).max(100),

    description: Joi.string().trim().max(2000).allow('', null),

    websiteUrl: Joi.string().uri().allow('', null),
  }),
};
