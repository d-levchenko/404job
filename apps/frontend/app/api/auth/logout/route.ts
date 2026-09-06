import axios from 'axios';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

import { api } from '../../api';

export async function POST(req: NextRequest) {
  try {
    const cookie = req.headers.get('cookie') ?? '';

    await api.post(
      '/auth/logout',
      {},
      {
        headers: {
          cookie,
        },
      },
    );

    const cookieStore = await cookies();

    cookieStore.delete('accessToken');
    cookieStore.delete('refreshToken');
    cookieStore.delete('sessionId');

    return new NextResponse(null, {
      status: 204,
    });
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
