import { Joi, Segments } from 'celebrate';
import { isValidObjectId } from 'mongoose';

const objectIdValidator = (value, helpers) =>
  !isValidObjectId(value) ? helpers.message('Invalid id') : value;

export const getAllVacanciesSchema = {
  [Segments.QUERY]: Joi.object({
    page: Joi.number().min(1).default(1),
    perPage: Joi.number().min(1).max(100).default(10),

    search: Joi.string().allow('', null),

    industry: Joi.array()
      .items(Joi.string().custom(objectIdValidator))
      .single()
      .allow(null),

    experience: Joi.array()
      .items(Joi.string().custom(objectIdValidator))
      .single()
      .allow(null),

    location: Joi.array()
      .items(Joi.string().custom(objectIdValidator))
      .single()
      .allow(null),

    employmentType: Joi.array()
      .items(Joi.string().custom(objectIdValidator))
      .single()
      .allow(null),

    isRemote: Joi.string().valid('true', 'false').allow('', null),
  }),
};

export const getVacancyByIdSchema = {
  [Segments.PARAMS]: Joi.object({
    id: Joi.string().custom(objectIdValidator).required(),
  }),
};

export const getHotVacanciesSchema = {
  [Segments.QUERY]: Joi.object({
    limit: Joi.number().integer().min(4).max(6),
  }),
};

export const createVacancySchema = {
  [Segments.BODY]: Joi.object({
    title: Joi.string().min(5).max(256).required(),
    description: Joi.string().min(50).max(4000).required(),
    requirements: Joi.string().min(50).max(4000).required(),
    duties: Joi.string().min(50).max(4000).required(),
    plusWillBe: Joi.string().min(20).max(4000).optional(),
    weOffer: Joi.string().min(50).max(4000).required(),
    salaryRange: Joi.string().optional(),
    industryId: Joi.string().custom(objectIdValidator).required(),
    experienceLevelId: Joi.string().custom(objectIdValidator).required(),
    locationId: Joi.string().custom(objectIdValidator).required(),
    employmentTypeId: Joi.string().custom(objectIdValidator).required(),
    isRemote: Joi.boolean().required(),
  }),
};

export const closeVacancySchema = {
  [Segments.PARAMS]: Joi.object({
    vacancyId: Joi.string().custom(objectIdValidator).required(),
  }),
};

export const getMyVacanciesSchema = {
  [Segments.QUERY]: Joi.object({
    page: Joi.number().min(1).default(1),
    perPage: Joi.number().min(1).max(100).default(10),
    status: Joi.string().valid('active', 'closed').allow('', null),
  }),
};
export const applyToVacancySchema = {
  [Segments.PARAMS]: Joi.object({
    vacancyId: Joi.string().custom(objectIdValidator).required(),
  }),
};
export const savedVacanciesScema = {
  [Segments.QUERY]: Joi.object({
    page: Joi.number().min(1).default(1),
    perPage: Joi.number().min(1).max(100).default(10),
  }),
};
