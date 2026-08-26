import { Joi, Segments } from 'celebrate';
import { isValidObjectId } from 'mongoose';
import { Status } from '../constants/status';

const objectIdValidator = (value, helpers) =>
  !isValidObjectId(value) ? helpers.message('Invalid id') : value;

export const getAllVacanciesSchema = {
  [Segments.QUERY]: Joi.object({
    employerId: Joi.string().custom(objectIdValidator).required(),
    title: Joi.string().trim().min(2).required(),
    description: Joi.string().allow('').optional().default(''),

    requirements: Joi.string().optional().default(''),
    duties: Joi.string().optional().default(''),
    plusWillBe: Joi.string().allow('').optional().default(''),
    weOffer: Joi.string().allow('').optional().default(''),

    industryId: Joi.string().custom(objectIdValidator).required(),
    experienceLevelId: Joi.string().custom(objectIdValidator).required(),
    locationId: Joi.string().custom(objectIdValidator).required(),
    employmentTypeId: Joi.string().custom(objectIdValidator).required(),

    isRemote: Joi.boolean().required().default(false),
    hotVacancy: Joi.boolean().required().default(false),

    status: Joi.string()
      .valid(...Status)
      .required(),

    salaryRange: Joi.string().trim().allow('').optional().default(''),
  }),
};
