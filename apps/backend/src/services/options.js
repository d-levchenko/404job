import createHttpError from 'http-errors';
import mongoose from 'mongoose';
import { Location } from '../models/location.js';
import { Industry } from '../models/industries.js';
import { ExperienceLevel } from '../models/experienceLevel.js';
import { EmploymentType } from '../models/employmentType.js';

const modelMap = {
  locations: Location,
  industries: Industry,
  experienceLevels: ExperienceLevel,
  employmentTypes: EmploymentType,
};

export const getOptionsService = async type => {
  const Model = modelMap[type];
  if (!Model) {
    throw createHttpError(400, `Invalid option type: ${type}`);
  }

  const result = await Model.find();
  return result;
};
