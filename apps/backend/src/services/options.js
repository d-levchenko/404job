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

const fallbackCollectionNames = {
  locations: ['locations', 'cities'],
  industries: ['industries', 'industry'],
  experienceLevels: [
    'experienceLevels',
    'experience_levels',
    'experiencelevels',
    'experiences',
  ],
  employmentTypes: [
    'employmentTypes',
    'employment_types',
    'employmenttypes',
    'employmentType',
    'employments',
  ],
};

export const getOptionsService = async type => {
  const Model = modelMap[type];
  if (!Model) {
    throw createHttpError(400, `Invalid option type: ${type}`);
  }

  const result = await Model.find();
  if (result.length > 0) {
    return result;
  }

  if (mongoose.connection?.db) {
    const alternativeNames = fallbackCollectionNames[type] || [];
    for (const collName of alternativeNames) {
      try {
        const docs = await mongoose.connection.db
          .collection(collName)
          .find()
          .toArray();
        if (docs.length > 0) {
          return docs;
        }
      } catch {
        // continue trying
      }
    }
  }

  return result;
};
