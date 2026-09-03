import createHttpError from 'http-errors';
import {
  getCurrentUser,
  updateCandidateProfile,
  updateEmployerProfile,
} from '../services/users.js';
import { saveFileToCloudinary } from '../utils/saveFileToCloudinary.js';

export const getCurrent = async (req, res, next) => {
  try {
    const user = await getCurrentUser(req.user._id);

    res.status(200).json({
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

export const updateCandidate = async (req, res, next) => {
  try {
    const user = await updateCandidateProfile(req.user._id, req.body);

    res.status(200).json({
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

export const updateEmployer = async (req, res, next) => {
  try {
    const updateData = {
      ...req.body,
    };

    if (req.file) {
      const logoUrl = await saveFileToCloudinary(req.file.buffer, req.user._id);

      updateData.logo = logoUrl;
    }

    if (Object.keys(updateData).length === 0) {
      throw createHttpError(400, 'At least one field must be provided');
    }

    const user = await updateEmployerProfile(req.user._id, updateData);

    res.status(200).json({
      data: user,
    });
  } catch (error) {
    next(error);
  }
};
