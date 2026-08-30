import { Router } from 'express';

import authenticate from '../middleware/authenticate.js';

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
} from '../validations/vacanciesValidator.js';
import { celebrate } from 'celebrate';

const vacancyRouter = Router();

vacancyRouter.get(
  '/get-all',
  celebrate(getAllVacanciesSchema),
  getAllVacancies,
);

vacancyRouter.get('/hot', celebrate(getHotVacanciesSchema), getHotVacancies);

vacancyRouter.get('/:id', celebrate(getVacancyByIdSchema), getVacancyById);
vacancyRouter.get('/favorite', authenticate, getFavoriteVacancies);

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

vacancyRouter.patch(
  '/:vacancyId/close',
  authenticate,
  celebrate(closeVacancySchema),
  closeVacancy,
);

vacancyRouter.get(
  '/my/vacancies',
  authenticate,
  celebrate(getMyVacanciesSchema),
  getMyVacancies,
);

export default vacancyRouter;
