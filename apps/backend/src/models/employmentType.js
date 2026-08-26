import { model, Schema } from 'mongoose';

const employmentTypeSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
  },
  { collection: 'employmentType', timestamps: false, versionKey: false },
);

export const EmploymentType = model('EmploymentType', employmentTypeSchema);
