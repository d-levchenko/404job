import { Schema, model } from 'mongoose';

const applicationSchema = new Schema(
  {
    vacancyId: {
      type: Schema.Types.ObjectId,
      ref: 'Vacancy',
      required: true,
    },
    candidateId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },

    resumeUrl: {
      type: String,
      default: '',
    },

    resumeName: {
      type: String,
      default: '',
    },

    status: {
      type: String,
      enum: ['pending', 'reviewed', 'accepted', 'rejected'],
      default: 'pending',
    },
  },
  { collection: 'applications', timestamps: true, versionKey: false },
);

applicationSchema.index({ vacancyId: 1, candidateId: 1 }, { unique: true });

export const Application = model('Application', applicationSchema);
