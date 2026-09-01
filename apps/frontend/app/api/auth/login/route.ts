import axios from 'axios';
import { NextRequest, NextResponse } from 'next/server';

import { AuthUser } from '@/types/auth';
import { api } from '../../api';

export const POST = async (request: NextRequest) => {
  try {
    const body = await request.json();

    const res = await api.post<AuthUser>('/auth/login', body);

    const response = NextResponse.json<AuthUser>(res.data, {
      status: res.status,
    });

    const setCookie = res.headers['set-cookie'];

    if (setCookie) {
      const cookieArr = Array.isArray(setCookie) ? setCookie : [setCookie];

      for (const cookie of cookieArr) {
        response.headers.append('Set-Cookie', cookie);
      }
    }

    return response;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return NextResponse.json(
        error.response?.data ?? { message: 'Request failed' },
        {
          status: error.response?.status ?? 500,
        },
      );
    }

    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 },
    );
  }
};
