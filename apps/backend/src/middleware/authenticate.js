import createHttpError from 'http-errors';
import { Session } from '../models/session.js';
import { User } from '../models/user.js';

const authenticate = async (req, res, next) => {
  const { accessToken, sessionId } = req.cookies;
  if (!sessionId) throw createHttpError(401, 'Session not found');
  if (!accessToken) throw createHttpError(401, 'Missing access token');
  const session = await Session.findOne({ accessToken, _id: sessionId });
  if (!session) throw createHttpError(401, 'Session not found');

  if (session.accessTokenValidUntil < Date.now())
    throw createHttpError(401, 'Access token expired');
  const user = await User.findOne({ _id: session.userId });
  if (!user) throw createHttpError(401);
  req.user = user;
  next();
};
export default authenticate;
