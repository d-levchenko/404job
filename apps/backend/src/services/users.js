import createHttpError from 'http-errors';

import { User } from '../models/user.js';

export const getCurrentUser = async userId => {
  const user = await User.findById(userId);

  if (!user) {
    throw createHttpError(404, 'User not found');
  }

  return user;
};

export const updateCandidateProfile = async (userId, data) => {
  const user = await User.findById(userId);

  if (!user) {
    throw createHttpError(404, 'User not found');
  }

  if (user.userType !== 'candidate') {
    throw createHttpError(403, 'Only candidates can update candidate profile');
  }

  if (data.name !== undefined) {
    user.name = data.name;
  }

  if (data.githubUrl !== undefined) {
    user.githubUrl = data.githubUrl;
  }

  if (data.linkedinUrl !== undefined) {
    user.linkedinUrl = data.linkedinUrl;
  }

  if (data.behanceUrl !== undefined) {
    user.behanceUrl = data.behanceUrl;
  }

  await user.save();

  return user;
};

export const updateEmployerProfile = async (userId, data) => {
  const user = await User.findById(userId);

  if (!user) {
    throw createHttpError(404, 'User not found');
  }

  if (user.userType !== 'employer') {
    throw createHttpError(403, 'Only employers can update employer profile');
  }

  if (data.companyName !== undefined) {
    user.companyName = data.companyName;
  }

  if (data.logo !== undefined) {
    user.logo = data.logo;
  }

  if (data.description !== undefined) {
    user.description = data.description;
  }

  if (data.websiteUrl !== undefined) {
    user.websiteUrl = data.websiteUrl;
  }

  await user.save();

  return user;
};
