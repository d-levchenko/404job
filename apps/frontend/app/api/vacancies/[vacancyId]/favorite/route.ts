import { isAxiosError } from 'axios';
import { NextRequest, NextResponse } from 'next/server';

import { logErrorResponse } from '../../../_utils/utils';
import { api } from '../../../api';

interface RouteContext {
  params: Promise<{
    vacancyId: string;
  }>;
}

export async function POST(req: NextRequest, { params }: RouteContext) {
  try {
    const { vacancyId } = await params;
    const cookie = req.headers.get('cookie') ?? '';

    const res = await api.post(
      `/vacancies/${vacancyId}/favorite`,
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
          message: 'Failed to add vacancy to saved',
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
      {
        message: 'Internal Server Error',
      },
      {
        status: 500,
      },
    );
  }
}

export async function DELETE(req: NextRequest, { params }: RouteContext) {
  try {
    const { vacancyId } = await params;
    const cookie = req.headers.get('cookie') ?? '';

    const res = await api.delete(`/vacancies/${vacancyId}/favorite`, {
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
          message: 'Failed to remove vacancy from saved',
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
      {
        message: 'Internal Server Error',
      },
      {
        status: 500,
      },
    );
  }
}
