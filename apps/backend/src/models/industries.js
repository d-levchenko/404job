import { model, Schema } from 'mongoose';

const industrySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
  },
  { collection: 'industries', timestamps: false, versionKey: false },
);

export const Industry = model('Industry', industrySchema);
