import { NextRequest, NextResponse } from 'next/server';

import { AuthUser } from '@/types/auth';
import { api } from '../api';

export const POST = async (request: NextRequest) => {
  try {
    const body = await request.json();

    const res = await api.post<AuthUser>('/auth/login', body);

    const response = NextResponse.json(res.data, {
      status: res.status,
    });

    const setCookie = res.headers['set-cookie'];

    if (setCookie) {
      const cookies = Array.isArray(setCookie) ? setCookie : [setCookie];

      for (const cookie of cookies) {
        response.headers.append('Set-Cookie', cookie);
      }
    }

    return response;
  } catch (error) {
    return NextResponse.json({ message: 'Login failed' }, { status: 401 });
  }
};
