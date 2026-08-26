import { Router } from 'express';
import authenticate from '../middleware/authenticate.js';
import { getAllVacancies } from '../controllers/vacanciesController.js';
import {
  addVacancyToFavorites,
  removeVacancyFromFavorites,
} from '../controllers/vacanciesController.js';

const vacancyRouter = Router();

vacancyRouter.get('/get-all', getAllVacancies);

vacancyRouter.use(authenticate);

vacancyRouter.post('/:vacancyId/favorite', addVacancyToFavorites);

vacancyRouter.delete('/:vacancyId/favorite', removeVacancyFromFavorites);

export default vacancyRouter;
