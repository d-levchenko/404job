import { isAxiosError } from 'axios';
import { NextRequest, NextResponse } from 'next/server';

import { logErrorResponse } from '../../../_utils/utils';
import { api } from '../../../api';

interface RouteContext {
  params: Promise<{
    vacancyId: string;
  }>;
}

export async function PATCH(req: NextRequest, { params }: RouteContext) {
  try {
    const cookie = req.headers.get('cookie') ?? '';
    const { vacancyId } = await params;

    const res = await api.patch(
      `/vacancies/${vacancyId}/close`,
      {},
      {
        headers: {
          cookie,
        },
      },
    );

    return NextResponse.json(res.data, {
      status: res.status,
    });
  } catch (error) {
    if (isAxiosError(error)) {
      logErrorResponse(error.response?.data);

      return NextResponse.json(
        error.response?.data ?? {
          message: 'Failed to close vacancy',
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
