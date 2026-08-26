import { model, Schema } from 'mongoose';
const userSchema = new Schema(
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
    githubUrl: { type: String, default: undefined },
    linkedinUrl: { type: String, default: undefined },
    behanceUrl: { type: String, default: undefined },
    savedVacancies: {
      type: [{ type: Schema.Types.ObjectId, ref: 'Vacancy' }],
      default: undefined,
    },
    logo: { type: String, default: undefined },
    description: { type: String, default: undefined },
    websiteUrl: { type: String, default: undefined },
  },
  { collection: 'users', timestamps: true, versionKey: false },
);

userSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.password;
  return obj;
};

export const User = model('User', userSchema);
