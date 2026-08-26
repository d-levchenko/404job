import { Router } from 'express';
import { celebrate } from 'celebrate';

import authenticate from '../middleware/authenticate.js';

import {
  getCurrent,
  updateCandidate,
  updateEmployer,
} from '../controllers/usersController.js';

import {
  updateCandidateSchema,
  updateEmployerSchema,
} from '../validations/usersValidator.js';

const router = Router();

router.get('/me', authenticate, getCurrent);

router.patch(
  '/candidate',
  authenticate,
  celebrate(updateCandidateSchema, {
    abortEarly: false,
  }),
  updateCandidate,
);

router.patch(
  '/employer',
  authenticate,
  celebrate(updateEmployerSchema, {
    abortEarly: false,
  }),
  updateEmployer,
);

export default router;
