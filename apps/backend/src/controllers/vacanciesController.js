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
  if (industry)
    vacanciesQuery.find({ name: { $regex: industry, $options: 'i' } });
  if (experience)
    vacanciesQuery.find({ name: { $regex: experience, $options: 'i' } });
  if (location)
    vacanciesQuery.find({ name: { $regex: location, $options: 'i' } });
  if (employmentType)
    vacanciesQuery.find({ name: { $regex: employmentType, $options: 'i' } });
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
