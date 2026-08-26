import { Schema, model } from 'mongoose';
import { employmentTypes } from '../constants/employmentTypes.js';

const employmentTypeSchema = new Schema(
  {
    name: {
      enum: employmentTypes,
      type: String,
      required: true,
    },
  },
  { collection: 'employmentType', timestamps: false, versionKey: false },
);

export const EmploymentType = model('EmploymentType', employmentTypeSchema);
