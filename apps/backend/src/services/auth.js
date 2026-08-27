import { FIFTEEN_MINUTES, ONE_DAY } from '../constants/time.js';
import { Session } from '../models/session.js';
import { randomUUID } from 'node:crypto';

export const createSession = async userId =>
  Session.create({
    userId,
    accessToken: randomUUID(),
    refreshToken: randomUUID(),
    accessTokenValidUntil: new Date(Date.now() + FIFTEEN_MINUTES),
    refreshTokenValidUntil: new Date(Date.now() + ONE_DAY),
  });
export const setSessionCookies = (res, session) => {
  const isProd = process.env.NODE_ENV === 'production';
  res.cookie('accessToken', session.accessToken, {
    httpOnly: true,
    secure: isProd,
    sameSite: 'none',
    maxAge: FIFTEEN_MINUTES,
  });
  res.cookie('refreshToken', session.refreshToken, {
    httpOnly: true,
    secure: isProd,
    sameSite: 'none',
    maxAge: ONE_DAY,
  });
  res.cookie('sessionId', session._id, {
    httpOnly: true,
    secure: isProd,
    sameSite: 'none',
    maxAge: ONE_DAY,
  });
};
