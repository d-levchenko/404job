import { Router } from 'express';

import authenticate from '../middleware/authenticate.js';
import { applyToVacancy } from '../controllers/vacanciesController.js';
import { applyToVacancySchema } from '../validations/vacanciesValidator.js';

import {
  getAllVacancies,
  getHotVacancies,
  getVacancyById,
  addVacancyToFavorites,
  removeVacancyFromFavorites,
  createVacancy,
  getFavoriteVacancies,
  closeVacancy,
  getMyVacancies,
} from '../controllers/vacanciesController.js';
import {
  createVacancySchema,
  getAllVacanciesSchema,
  getHotVacanciesSchema,
  getVacancyByIdSchema,
  closeVacancySchema,
  getMyVacanciesSchema,
  savedVacanciesScema,
} from '../validations/vacanciesValidator.js';
import { celebrate } from 'celebrate';

const vacancyRouter = Router();

vacancyRouter.get(
  '/get-all',
  celebrate(getAllVacanciesSchema),
  getAllVacancies,
);

vacancyRouter.get('/hot', celebrate(getHotVacanciesSchema), getHotVacancies);
vacancyRouter.get(
  '/favorite',
  authenticate,
  celebrate(savedVacanciesScema),
  getFavoriteVacancies,
);
vacancyRouter.get(
  '/my/vacancies',
  authenticate,
  celebrate(getMyVacanciesSchema),
  getMyVacancies,
);

vacancyRouter.post('/:vacancyId/favorite', authenticate, addVacancyToFavorites);

vacancyRouter.delete(
  '/:vacancyId/favorite',
  authenticate,
  removeVacancyFromFavorites,
);

vacancyRouter.post(
  '/create-vacancy',
  authenticate,
  celebrate(createVacancySchema),
  createVacancy,
);

vacancyRouter.get(
  '/:vacancyId',
  celebrate(getVacancyByIdSchema),
  getVacancyById,
);

vacancyRouter.patch(
  '/:vacancyId/close',
  authenticate,
  celebrate(closeVacancySchema),
  closeVacancy,
);

vacancyRouter.post(
  '/:vacancyId/apply',
  authenticate,
  celebrate(applyToVacancySchema),
  applyToVacancy,
);

export default vacancyRouter;
