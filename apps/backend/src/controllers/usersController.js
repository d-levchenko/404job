import {
  getCurrentUser,
  updateCandidateProfile,
  updateEmployerProfile,
} from '../services/users.js';

export const getCurrent = async (req, res, next) => {
  try {
    const user = await getCurrentUser(req.user._id);

    res.status(200).json(user);
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
    const user = await updateEmployerProfile(req.user._id, req.body);

    res.status(200).json({
      data: user,
    });
  } catch (error) {
    next(error);
  }
};
