import { Router } from 'express';
import { celebrate } from 'celebrate';
import { getOptionsSchema } from '../validations/optionsValidator.js';
import { getOptions } from '../controllers/optionsController.js';

const optionsRouter = Router();

optionsRouter.get('/', celebrate(getOptionsSchema), getOptions);

export default optionsRouter;
