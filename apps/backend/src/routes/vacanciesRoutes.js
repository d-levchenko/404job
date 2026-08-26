import { Router } from 'express';
import { getAllVacancies } from '../controllers/vacanciesController.js';

const vacancyRouter = Router();

vacancyRouter.get('/get-all', getAllVacancies);

export default vacancyRouter;
