import { Joi, Segments } from 'celebrate';
import { isValidObjectId } from 'mongoose';

const objectIdValidator = (value, helpers) =>
  !isValidObjectId(value) ? helpers.message('Invalid id') : value;

export const getAllVacanciesSchema = {
  [Segments.QUERY]: Joi.object({
    page: Joi.number().min(1).required(),
    perPage: Joi.number().min(1).required(),

    search: Joi.string().allow('', null),

    industry: Joi.string().custom(objectIdValidator).allow('', null),
    experience: Joi.string().custom(objectIdValidator).allow('', null),
    location: Joi.string().custom(objectIdValidator).allow('', null),
    employmentType: Joi.string().custom(objectIdValidator).allow('', null),

    isRemote: Joi.string().valid('true', 'false').allow('', null),
  }),
};

export const getVacancyByIdSchema = {
  [Segments.PARAMS]: Joi.object({
    id: Joi.string().custom(objectIdValidator).required(),
  }),
};
