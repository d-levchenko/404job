import { Router } from 'express';
import authenticate from '../middleware/authenticate.js';
import {
  addVacancyToFavorites,
  removeVacancyFromFavorites,
} from '../controllers/vacanciesController.js';

const vacanciesRouter = Router();

vacanciesRouter.use(authenticate);

vacanciesRouter.post('/:vacancyId/favorite', addVacancyToFavorites);

vacanciesRouter.delete('/:vacancyId/favorite', removeVacancyFromFavorites);

export default vacanciesRouter;
