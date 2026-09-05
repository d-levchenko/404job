import { cookies } from 'next/headers';
import { api } from '../../api';
import { parseCookie } from 'cookie';
import { NextRequest, NextResponse } from 'next/server';
import { isAxiosError } from 'axios';
import { logErrorResponse } from '../../_utils/utils';

export async function POST(req: NextRequest) {
  try {
    const cookie = req.headers.get('cookie') ?? '';
    const hasRefreshToken = cookie
      .split(';')
      .some(cookie => cookie.trim().startsWith('refreshToken'));
    if (!hasRefreshToken) {
      return NextResponse.json({ error: 'No active session' }, { status: 401 });
    }
    const apiRes = await api.post(
      'auth/refresh',
      {},
      {
        headers: { cookie },
      },
    );

    const cookieStore = await cookies();
    const setCookie = apiRes.headers['set-cookie'];
    if (setCookie) {
      const cookieArray = Array.isArray(setCookie) ? setCookie : [setCookie];
      for (const cookieStr of cookieArray) {
        const parsed = parseCookie(cookieStr);
        const options = {
          expires: parsed.Expires ? new Date(parsed.Expires) : undefined,
          path: parsed.Path,
          maxAge: Number(parsed['Max-Age']),
        };
        if (parsed.accessToken) {
          cookieStore.set('accessToken', parsed.accessToken, options);
        }
        if (parsed.refreshToken) {
          cookieStore.set('refreshToken', parsed.refreshToken, options);
        }
        if (parsed.sessionId) {
          cookieStore.set('sessionId', parsed.sessionId, options);
        }
      }
      return NextResponse.json(apiRes.data);
    }
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
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
