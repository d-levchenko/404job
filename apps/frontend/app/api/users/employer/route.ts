import axios from 'axios';
import { NextRequest, NextResponse } from 'next/server';

import { api } from '../../api';

export async function PATCH(request: NextRequest) {
  try {
    const cookie = request.headers.get('cookie') ?? '';

    const formData = await request.formData();

    const response = await api.patch('/users/employer', formData, {
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
          message: 'Не вдалося оновити профіль роботодавця',
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
