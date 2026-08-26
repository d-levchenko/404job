import { Router } from 'express';
import {
  getAllVacancies,
  getHotVacancies,
} from '../controllers/vacanciesController.js';
import { getAllVacanciesSchema } from '../validations/vacanciesValidator.js';
import { celebrate } from 'celebrate';

const vacancyRouter = Router();

vacancyRouter.get(
  '/get-all',
  celebrate(getAllVacanciesSchema),
  getAllVacancies,
);

vacancyRouter.get('/hot', getHotVacancies);

export default vacancyRouter;
