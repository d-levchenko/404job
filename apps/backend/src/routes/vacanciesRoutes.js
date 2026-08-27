import { Router } from 'express';

import authenticate from '../middleware/authenticate.js';

import {
  getAllVacancies,
  getHotVacancies,
  getVacancyById,
  addVacancyToFavorites,
  removeVacancyFromFavorites,
  createVacancy,
} from '../controllers/vacanciesController.js';
import {
  getAllVacanciesSchema,
  getHotVacanciesSchema,
  getVacancyByIdSchema,
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

vacancyRouter.post('/:vacancyId/favorite', authenticate, addVacancyToFavorites);

vacancyRouter.delete(
  '/:vacancyId/favorite',
  authenticate,
  removeVacancyFromFavorites,
);

vacancyRouter.post('/create-vacancy', authenticate, createVacancy);

export default vacancyRouter;
