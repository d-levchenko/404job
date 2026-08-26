import { Joi, Segments } from 'celebrate';

export const getOptionsSchema = {
  [Segments.QUERY]: Joi.object({
    type: Joi.string()
      .valid('locations', 'industries', 'experienceLevels', 'employmentTypes')
      .required(),
  }),
};
