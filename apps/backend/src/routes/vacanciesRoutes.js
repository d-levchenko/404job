import { Router } from 'express';

import authenticate from '../middleware/authenticate.js';

import {
  getAllVacancies,
  getHotVacancies,
  addVacancyToFavorites,
  removeVacancyFromFavorites,
} from '../controllers/vacanciesController.js';

const vacancyRouter = Router();

vacancyRouter.get('/get-all', getAllVacancies);

vacancyRouter.get('/hot', getHotVacancies);

vacancyRouter.post('/:vacancyId/favorite', authenticate, addVacancyToFavorites);

vacancyRouter.delete(
  '/:vacancyId/favorite',
  authenticate,
  removeVacancyFromFavorites,
);

export default vacancyRouter;
