import { User } from '../models/user.js';
import createHttpError from 'http-errors';
import { Vacancy } from '../models/vacancy.js';
import { Application } from '../models/application.js';

const toArray = value => {
  if (value === undefined || value === null || value === '') return undefined;
  return Array.isArray(value) ? value : [value];
};

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

    const filter = {};

    if (search) filter.title = { $regex: search, $options: 'i' };

    const industryIds = toArray(industry);
    if (industryIds) filter.industryId = { $in: industryIds };

    const experienceIds = toArray(experience);
    if (experienceIds) filter.experienceLevelId = { $in: experienceIds };

    const locationIds = toArray(location);
    if (locationIds) filter.locationId = { $in: locationIds };

    const employmentTypeIds = toArray(employmentType);
    if (employmentTypeIds) filter.employmentTypeId = { $in: employmentTypeIds };

    if (isRemote) filter.isRemote = isRemote === 'true';

    const vacanciesQuery = Vacancy.find(filter).populate(
      'industryId experienceLevelId locationId employmentTypeId employerId',
    );

    const [totalItems, vacancies] = await Promise.all([
      Vacancy.countDocuments(filter),
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
      .sort({ createdAt: -1, _id: 1 })
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

export const getFavoriteVacancies = async (req, res, next) => {
  try {
    const { _id: userId, userType } = req.user;
    const page = Number(req.query.page) || 1;
    const perPage = Number(req.query.perPage) || 4;

    if (userType !== 'candidate')
      throw createHttpError(403, 'Only candidates can view saved vacancies');

    const user = await User.findById(userId).populate({
      path: 'savedVacancies',
      populate: {
        path: 'industryId experienceLevelId locationId employmentTypeId employerId',
      },
    });
    if (!user) {
      throw createHttpError(404, 'User not found');
    }
    const skip = (page - 1) * perPage;
    const savedVacancies = user.savedVacancies.slice(skip, skip + perPage);
    const totalSavedVacancies = user?.savedVacancies?.length || 0;
    const totalPages = Math.ceil(totalSavedVacancies / perPage) || 1;

    res
      .status(200)
      .json({ page, perPage, totalPages, totalSavedVacancies, savedVacancies });
  } catch (error) {
    next(error);
  }
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
        .populate('industryId experienceLevelId locationId employmentTypeId'),
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
export const applyToVacancy = async (req, res, next) => {
  try {
    const { vacancyId } = req.params;
    const { _id: userId, userType } = req.user;

    if (userType !== 'candidate') {
      throw createHttpError(403, 'Only candidates can apply for vacancies');
    }

    const vacancy = await Vacancy.findById(vacancyId);

    if (!vacancy) {
      throw createHttpError(404, 'Vacancy not found');
    }

    if (vacancy.status !== 'active') {
      throw createHttpError(400, 'This vacancy is closed for applications');
    }

    const existingApplication = await Application.findOne({
      vacancyId,
      candidateId: userId,
    });

    if (existingApplication) {
      throw createHttpError(409, 'You have already applied for this vacancy');
    }

    const application = await Application.create({
      vacancyId,
      candidateId: userId,
    });

    res.status(201).json({
      message: 'Application submitted successfully',
      application,
    });
  } catch (error) {
    next(error);
  }
};
