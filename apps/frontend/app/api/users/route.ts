import axios from 'axios';
import { NextRequest, NextResponse } from 'next/server';

import { api } from '../api';

export async function GET(request: NextRequest) {
  try {
    const cookie = request.headers.get('cookie') ?? '';

    const response = await api.get('/users/me', {
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
          message: 'Failed to get current user',
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
