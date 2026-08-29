import { User } from '../models/user.js';
import createHttpError from 'http-errors';
import { Vacancy } from '../models/vacancy.js';

export const getAllVacancies = async (req, res, next) => {
  try {
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
      'industryId experienceLevelId locationId employmentTypeId employerId',
    );

    if (search)
      vacanciesQuery.find({ title: { $regex: search, $options: 'i' } });
    if (industry) vacanciesQuery.find({ industryId: industry });
    if (experience) vacanciesQuery.find({ experienceLevelId: experience });
    if (location) vacanciesQuery.find({ locationId: location });
    if (employmentType)
      vacanciesQuery.find({ employmentTypeId: employmentType });
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
  } catch (error) {
    next(error);
  }
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

export const getHotVacancies = async (req, res, next) => {
  try {
    const { limit = 6 } = req.query;
    const vacancies = await Vacancy.find({
      status: 'active',
      hotVacancy: true,
    })
      .sort({ createdAt: -1 })
      .limit(Number(limit))
      .populate('employerId', 'companyName logo')
      .populate('locationId', 'name');

    res.json(vacancies);
  } catch (error) {
    next(error);
  }
};

export const getVacancyById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const vacancy = await Vacancy.findById(id)
      .populate('employerId', 'companyName logo websiteUrl description')
      .populate('industryId', 'name')
      .populate('experienceLevelId', 'name')
      .populate('locationId', 'name')
      .populate('employmentTypeId', 'name');

    if (!vacancy) {
      throw createHttpError(404, 'Вакансію не знайдено');
    }

    const rawIndustryId = vacancy.industryId?._id || vacancy.industryId;

    const similarVacancies = await Vacancy.find({
      industryId: rawIndustryId,
      _id: { $ne: vacancy._id },
      status: 'active',
    })
      .populate('employerId', 'companyName logo')
      .populate('locationId', 'name')
      .limit(3)
      .lean();

    res.status(200).json({
      vacancy,
      similarVacancies,
    });
  } catch (error) {
    next(error);
  }
};

export const createVacancy = async (req, res) => {
  const vacancy = await Vacancy.create({
    ...req.body,
    employerId: req.user._id,
  });
  res.status(201).json(vacancy);
};

export const closeVacancy = async (req, res) => {
  const { vacancyId } = req.params;
  const { _id: userId, userType } = req.user;

  if (userType !== 'employer') {
    throw createHttpError(403, 'Only employers can close vacancies');
  }

  const vacancy = await Vacancy.findById(vacancyId);

  if (!vacancy) {
    throw createHttpError(404, 'Vacancy not found');
  }

  if (String(vacancy.employerId) !== String(userId)) {
    throw createHttpError(403, 'You can only close your own vacancies');
  }

  vacancy.status = 'closed';
  await vacancy.save();

  res.status(200).json(vacancy);
};

export const getMyVacancies = async (req, res, next) => {
  try {
    const { _id: userId, userType } = req.user;

    if (userType !== 'employer') {
      throw createHttpError(403, 'Only employers can view their vacancies');
    }

    const { page = 1, perPage = 10, status } = req.query;
    const skip = (page - 1) * perPage;

    const query = { employerId: userId };
    if (status) query.status = status;

    const [totalItems, vacancies] = await Promise.all([
      Vacancy.countDocuments(query),
      Vacancy.find(query)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(perPage)
        .populate('industryId experienceLevelId locationId employmentTypeId')
        .populate('employerId', 'companyName logo'),
    ]);

    const totalPages = Math.ceil(totalItems / perPage);

    res.status(200).json({
      page,
      perPage,
      totalVacancies: totalItems,
      totalPages,
      vacancies,
    });
  } catch (error) {
    next(error);
  }
};
