import { Router } from 'express';

import authenticate from '../middleware/authenticate.js';

import {
  getAllVacancies,
  getHotVacancies,
  addVacancyToFavorites,
  removeVacancyFromFavorites,
} from '../controllers/vacanciesController.js';
import {
  getAllVacanciesSchema,
  getHotVacanciesSchema,
} from '../validations/vacanciesValidator.js';
import { celebrate } from 'celebrate';

const vacancyRouter = Router();

vacancyRouter.get(
  '/get-all',
  celebrate(getAllVacanciesSchema),
  getAllVacancies,
);

vacancyRouter.get('/hot', celebrate(getHotVacanciesSchema), getHotVacancies);

vacancyRouter.post('/:vacancyId/favorite', authenticate, addVacancyToFavorites);

vacancyRouter.delete(
  '/:vacancyId/favorite',
  authenticate,
  removeVacancyFromFavorites,
);

export default vacancyRouter;
