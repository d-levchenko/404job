import { Joi, Segments } from 'celebrate';

export const registerUserSchema = {
  [Segments.BODY]: Joi.object({
    userType: Joi.string().valid('candidate', 'employer').required(),
    name: Joi.string().min(2).max(32).when('userType', {
      is: 'candidate',
      then: Joi.required(),
      otherwise: Joi.optional(),
    }),
    companyName: Joi.string().min(2).max(64).when('userType', {
      is: 'employer',
      then: Joi.required(),
      otherwise: Joi.optional(),
    }),
    email: Joi.string().email().max(64).required(),
    password: Joi.string().min(8).max(128).required(),
  }),
};
export const loginUserSchema = {
  [Segments.BODY]: Joi.object({
    email: Joi.string().email().max(64).required(),
    password: Joi.string().min(8).max(128).required(),
  }),
};
