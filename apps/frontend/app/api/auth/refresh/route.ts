import axios from 'axios';
import { NextRequest, NextResponse } from 'next/server';

import { api } from '../../api';

export async function POST(req: NextRequest) {
  try {
    const cookie = req.headers.get('cookie') ?? '';

    if (!cookie.includes('refreshToken=')) {
      return NextResponse.json(
        { message: 'No active session' },
        { status: 401 },
      );
    }

    const apiRes = await api.post(
      '/auth/refresh',
      {},
      {
        headers: {
          cookie,
        },
      },
    );

    const response = NextResponse.json(apiRes.data, {
      status: apiRes.status,
    });

    const setCookie = apiRes.headers['set-cookie'];

    if (setCookie) {
      const cookieArray = Array.isArray(setCookie) ? setCookie : [setCookie];

      for (const cookie of cookieArray) {
        response.headers.append('Set-Cookie', cookie);
      }
    }

    return response;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return NextResponse.json(
        error.response?.data ?? {
          message: 'Request failed',
        },
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
}
