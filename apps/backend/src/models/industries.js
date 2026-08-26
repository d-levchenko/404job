import { Schema, model } from 'mongoose';
import { Industries } from '../constants/industries.js';

const industrySchema = new Schema(
  {
    name: {
      enum: Industries,
      type: String,
      required: true,
    },
  },
  { collection: 'industries', timestamps: true, versionKey: false },
);

export const Industry = model('Industry', industrySchema);
