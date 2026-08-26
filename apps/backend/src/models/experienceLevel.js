import { model, Schema } from 'mongoose';

const experienceLevelSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
  },
  { collection: 'experienceLevels', timestamps: false, versionKey: false },
);

export const ExperienceLevel = model('ExperienceLevel', experienceLevelSchema);
