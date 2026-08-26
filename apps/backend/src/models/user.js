import { model, Schema } from 'mongoose';
const userSchema = Schema(
  {
    userType: {
      type: String,
      enum: ['candidate', 'employer'],
      required: true,
    },
    name: {
      type: String,
      required: function () {
        return this.userType === 'candidate';
      },
    },
    companyName: {
      type: String,
      required: function () {
        return this.userType === 'employer';
      },
    },
    email: {
      type: String,
      unique: true,
      trim: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    githubUrl: { type: String, required: false },
    linkedin: { type: String, required: false },
    behanceUrl: { type: String, required: false },
    logo: { type: String, required: false, default: '' },
    description: { type: String, required: false, default: '' },
    websiteUrl: { type: String, required: false, default: '' },
  },
  { collection: 'users', timestamps: true, versionKey: false },
);

userSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.password;
  return obj;
};

export const User = model('users', userSchema);
