import axios from 'axios';
import { NextRequest, NextResponse } from 'next/server';

import { api } from '../../../api';

export async function GET(request: NextRequest) {
  try {
    const cookie = request.headers.get('cookie') ?? '';

    const page = request.nextUrl.searchParams.get('page') ?? '1';
    const perPage = request.nextUrl.searchParams.get('perPage') ?? '7';

    const response = await api.get('/vacancies/my/applications', {
      params: {
        page,
        perPage,
      },
      headers: {
        cookie,
      },
    });

    return NextResponse.json(response.data, {
      status: response.status,
    });
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return NextResponse.json(
        error.response?.data ?? {
          message: 'Failed to get employer applications',
        },
        {
          status: error.response?.status ?? 500,
        },
      );
    }

    return NextResponse.json(
      {
        message: 'Internal server error',
      },
      {
        status: 500,
      },
    );
  }
}
