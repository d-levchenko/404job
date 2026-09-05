import { NextRequest, NextResponse } from 'next/server';
import { logErrorResponse } from '../../_utils/utils';
import { api } from '../../api';
import { isAxiosError } from 'axios';
import { cookies } from 'next/headers';

export async function POST(req: NextRequest) {
  try {
    const cookie = req.headers.get('cookie') ?? '';
    const response = await api.post(
      '/auth/logout',
      {},
      { headers: { cookie } },
    );

    console.log(response.status);
    const cookieStore = await cookies();
    cookieStore.delete('accessToken');
    cookieStore.delete('refreshToken');
    cookieStore.delete('sessionId');

    return NextResponse.json(response.data);
  } catch (error) {
    if (isAxiosError(error)) {
      logErrorResponse(error.response?.data);

      return NextResponse.json(
        {
          error: error.message,
          response: error.response?.data || null,
        },
        {
          status: typeof error.status === 'number' ? error.status : 500,
        },
      );
    }

    logErrorResponse({ message: (error as Error).message });
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 },
    );
  }
}
