import { User } from '../models/user.js';
import { Vacancy } from '../models/vacancy.js';
import createHttpError from 'http-errors';

export const getAllVacancies = async (req, res) => {
  const {
    page = 1,
    perPage = 10,
    search,
    industry,
    experience,
    location,
    employmentType,
    isRemote,
  } = req.query;
  const skip = (page - 1) * perPage;

  const vacanciesQuery = Vacancy.find().populate(
    'industryId experienceLevelId locationId employmentTypeId',
  );

  if (search) vacanciesQuery.find({ title: { $regex: search, $options: 'i' } });
  if (industry) vacanciesQuery.find({ industryId: industry });
  if (experience) vacanciesQuery.find({ experienceLevelId: experience });
  if (location) vacanciesQuery.find({ locationId: location });
  if (employmentType) vacanciesQuery.find({ employmentTypeId: employmentType });
  if (isRemote) vacanciesQuery.find({ isRemote: isRemote === 'true' });

  const [totalItems, vacancies] = await Promise.all([
    vacanciesQuery.clone().countDocuments(),
    vacanciesQuery.skip(skip).limit(perPage),
  ]);

  const totalPages = Math.ceil(totalItems / perPage);

  res.json({
    page,
    perPage,
    totalVacancies: totalItems,
    totalPages,
    vacancies,
  });
};

export const addVacancyToFavorites = async (req, res) => {
  const { vacancyId } = req.params;
  const { _id: userId, userType } = req.user;

  if (userType !== 'candidate') {
    throw createHttpError(403, 'Only candidates can save vacancies');
  }

  const vacancy = await Vacancy.findById(vacancyId);

  if (!vacancy) {
    throw createHttpError(404, 'Vacancy not found');
  }

  const updatedUser = await User.findByIdAndUpdate(
    userId,
    {
      $addToSet: {
        savedVacancies: vacancyId,
      },
    },
    {
      returnDocument: 'after',
    },
  ).populate('savedVacancies');

  res.status(200).json({
    message: 'Vacancy added to favorites',
    savedVacancies: updatedUser.savedVacancies,
  });
};

export const removeVacancyFromFavorites = async (req, res) => {
  const { vacancyId } = req.params;
  const { _id: userId, userType } = req.user;

  if (userType !== 'candidate') {
    throw createHttpError(403, 'Only candidates can remove saved vacancies');
  }

  const vacancy = await Vacancy.findById(vacancyId);

  if (!vacancy) {
    throw createHttpError(404, 'Vacancy not found');
  }

  const updatedUser = await User.findByIdAndUpdate(
    userId,
    {
      $pull: {
        savedVacancies: vacancyId,
      },
    },
    {
      returnDocument: 'after',
    },
  ).populate('savedVacancies');

  res.status(200).json({
    message: 'Vacancy removed from favorites',
    savedVacancies: updatedUser.savedVacancies,
  });
};
