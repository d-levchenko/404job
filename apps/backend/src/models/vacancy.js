import { Schema, model } from 'mongoose';
import { Status } from '../constants/status.js';

const vacancySchema = new Schema(
  {
    employerId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true, trim: true, minLength: 2 },
    description: { type: String, default: '' },
    requirements: { type: String, default: '' },
    duties: { type: String, default: '' },
    plusWillBe: { type: String, default: '' },
    weOffer: { type: String, default: '' },
    industryId: {
      type: Schema.Types.ObjectId,
      ref: 'Industry',
    },
    experienceLevelId: {
      type: Schema.Types.ObjectId,
      ref: 'ExperienceLevel',
    },
    locationId: {
      type: Schema.Types.ObjectId,
      ref: 'Location',
    },
    employmentTypeId: {
      type: Schema.Types.ObjectId,
      ref: 'EmploymentType',
    },
    isRemote: { type: Boolean, required: true, default: false },
    status: {
      enum: Status,
      type: String,
      required: true,
      default: 'active',
    },
    salaryRange: { type: String, default: '' },
    hotVacancy: { type: Boolean, required: true, default: false },
  },
  { collection: 'vacancies', timestamps: true, versionKey: false },
);

export const Vacancy = model('Vacancy', vacancySchema);
