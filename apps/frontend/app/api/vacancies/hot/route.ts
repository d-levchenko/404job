export const dynamic = 'force-dynamic';

import { isAxiosError } from 'axios';
import { NextRequest, NextResponse } from 'next/server';
import { logErrorResponse } from '../../_utils/utils';
import { api } from '../../api';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);

    const rawLimit = searchParams.get('limit');

    const params = {
      limit: rawLimit ? Number(rawLimit) : undefined,
    };

    const res = await api.get('/vacancies/hot', { params });

    return NextResponse.json(res.data, {
      status: res.status,
    });
  } catch (error) {
    if (isAxiosError(error)) {
      logErrorResponse(error.response?.data);

      return NextResponse.json(
        {
          error: error.message,
          response: error.response?.data || null,
        },
        {
          status: error.response?.status ?? 500,
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
