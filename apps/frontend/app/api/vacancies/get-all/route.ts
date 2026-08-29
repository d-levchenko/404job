import { isAxiosError } from 'axios';
import { NextRequest, NextResponse } from 'next/server';
import { logErrorResponse } from '../../_utils/utils';
import { getAllVacanciesRequest } from '@/lib/vacanciesApi';
import { api } from '../../api';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);

    const rawIsRemote = searchParams.get('isRemote');

    const params: getAllVacanciesRequest = {
      page: searchParams.get('page')
        ? Number(searchParams.get('page'))
        : undefined,
      perPage: searchParams.get('perPage')
        ? Number(searchParams.get('perPage'))
        : undefined,
      search: searchParams.get('search') || undefined,
      industry: searchParams.get('industry'),
      experience: searchParams.get('experience'),
      location: searchParams.get('location'),
      employmentType: searchParams.get('employmentType'),
      isRemote: rawIsRemote === null ? null : rawIsRemote === 'true',
    };

    const res = await api.get('/vacancies/get-all', { params });

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
