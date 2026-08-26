import { Schema, model } from 'mongoose';

const locationSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
  },
  {
    collection: 'locations',
    timestamps: true,
    versionKey: false,
  },
);

export const Location = model('Location', locationSchema);
