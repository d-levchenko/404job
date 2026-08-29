import { isAxiosError } from 'axios';
import { NextRequest, NextResponse } from 'next/server';

import { logErrorResponse } from '../../../_utils/utils';
import { api } from '../../../api';

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ vacancyId: string }> },
) {
  try {
    const { vacancyId } = await params;
    const cookie = req.headers.get('cookie') ?? '';

    const res = await api.patch(
      `/vacancies/${vacancyId}/close`,
      {},
      {
        headers: {
          cookie,
        },
      },
    );

    return NextResponse.json(res.data);
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
