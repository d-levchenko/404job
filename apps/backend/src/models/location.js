import { model, Schema } from 'mongoose';

const locationSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
  },
  { collection: 'locations', timestamps: false, versionKey: false },
);

export const Location = model('Location', locationSchema);
