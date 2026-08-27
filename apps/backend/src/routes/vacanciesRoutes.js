import { Router } from 'express';

import authenticate from '../middleware/authenticate.js';

import {
  getAllVacancies,
  getHotVacancies,
  getVacancyById,
  addVacancyToFavorites,
  removeVacancyFromFavorites,
} from '../controllers/vacanciesController.js';
import {
  getAllVacanciesSchema,
  getVacancyByIdSchema,
} from '../validations/vacanciesValidator.js';
import { celebrate } from 'celebrate';

const vacancyRouter = Router();

vacancyRouter.get(
  '/get-all',
  celebrate(getAllVacanciesSchema),
  getAllVacancies,
);

vacancyRouter.get('/hot', getHotVacancies);

vacancyRouter.get('/:id', celebrate(getVacancyByIdSchema), getVacancyById);

vacancyRouter.post('/:vacancyId/favorite', authenticate, addVacancyToFavorites);

vacancyRouter.delete(
  '/:vacancyId/favorite',
  authenticate,
  removeVacancyFromFavorites,
);

export default vacancyRouter;
