import { isAxiosError } from 'axios';
import { NextRequest, NextResponse } from 'next/server';
import { logErrorResponse } from '../_utils/utils';
import { getAllVacanciesRequest } from '@/lib/vacanciesApi';
import { api } from '../api';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const rawIsRemote = searchParams.get('isRemote');

    const industry = searchParams.getAll('industry');
    const experience = searchParams.getAll('experience');
    const employmentType = searchParams.getAll('employmentType');

    const params: getAllVacanciesRequest = {
      page: searchParams.get('page')
        ? Number(searchParams.get('page'))
        : undefined,
      perPage: searchParams.get('perPage')
        ? Number(searchParams.get('perPage'))
        : undefined,
      search: searchParams.get('search') || undefined,
      industry: industry.length ? industry : undefined,
      experience: experience.length ? experience : undefined,
      location: searchParams.get('location'),
      employmentType: employmentType.length ? employmentType : undefined,
      isRemote: rawIsRemote === null ? null : rawIsRemote === 'true',
    };

    const res = await api.get('/vacancies', { params });
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
