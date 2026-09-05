import axios from 'axios';
import { NextRequest, NextResponse } from 'next/server';

import { api } from '../../../../api';

interface RouteContext {
  params: Promise<{
    applicationId: string;
  }>;
}

export async function PATCH(request: NextRequest, { params }: RouteContext) {
  try {
    const cookie = request.headers.get('cookie') ?? '';

    const { applicationId } = await params;
    const body = await request.json();

    const response = await api.patch(
      `/vacancies/applications/${applicationId}/status`,
      body,
      {
        headers: {
          cookie,
        },
      },
    );

    return NextResponse.json(response.data, {
      status: response.status,
    });
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return NextResponse.json(
        error.response?.data ?? {
          message: 'Failed to update application status',
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
