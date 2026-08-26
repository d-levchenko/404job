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
    logo: { type: String, required: false },
    description: { type: String, required: false },
    websiteUrl: { type: String, required: false },
  },
  { collection: 'user', timestamps: true, versionKey: false },
);

userSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.password;
  return obj;
};

export const User = model('user', userSchema);
