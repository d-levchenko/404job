import { NextRequest, NextResponse } from 'next/server';

import { AuthUser } from '@/types/auth';
import { api } from '../../api';

export const POST = async (request: NextRequest) => {
  const body = await request.json();

  const res = await api.post('/auth/login', body);

  const response = NextResponse.json<AuthUser>(res.data);

  const setCookie = res.headers['set-cookie'];

  if (setCookie) {
    for (const cookie of setCookie) {
      response.headers.append('Set-Cookie', cookie);
    }
  }

  return response;
};
