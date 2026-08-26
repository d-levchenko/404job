import { Router } from 'express';
import {
  getAllVacancies,
  getHotVacancies,
} from '../controllers/vacanciesController.js';

const vacancyRouter = Router();

vacancyRouter.get('/get-all', getAllVacancies);

vacancyRouter.get('/hot', getHotVacancies);

export default vacancyRouter;
