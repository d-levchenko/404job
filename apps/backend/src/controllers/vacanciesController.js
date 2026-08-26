import { Vacancy } from '../models/vacancy.js';

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
