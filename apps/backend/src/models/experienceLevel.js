import { Schema, model } from 'mongoose';
import { experienceLevels } from '../constants/experienceLevels.js';

const experienceLevelSchema = new Schema(
  {
    name: {
      enum: experienceLevels,
      type: String,
      required: true,
    },
  },
  {
    collection: 'experienceLevels',
    timestamps: false,
    versionKey: false,
  },
);

export const ExperienceLevel = model('ExperienceLevel', experienceLevelSchema);
