import { isAxiosError } from 'axios';
import { NextRequest, NextResponse } from 'next/server';

import { logErrorResponse } from '../../_utils/utils';
import { api } from '../../api';

export async function GET(req: NextRequest) {
  try {
    const cookie = req.headers.get('cookie') ?? '';
    const { searchParams } = new URL(req.url);

    const page = searchParams.get('page') ?? '1';
    const perPage = searchParams.get('perPage') ?? '4';
    const status = searchParams.get('status') ?? 'active';

    const res = await api.get('/vacancies/my/vacancies', {
      params: {
        page,
        perPage,
        status,
      },
      headers: {
        cookie,
      },
    });

    return NextResponse.json(res.data, {
      status: res.status,
    });
  } catch (error) {
    if (isAxiosError(error)) {
      logErrorResponse(error.response?.data);

      return NextResponse.json(
        error.response?.data ?? {
          message: 'Failed to get employer vacancies',
        },
        {
          status: error.response?.status ?? 500,
        },
      );
    }

    logErrorResponse({
      message: (error as Error).message,
    });

    return NextResponse.json(
      { message: 'Internal Server Error' },
      { status: 500 },
    );
  }
}
