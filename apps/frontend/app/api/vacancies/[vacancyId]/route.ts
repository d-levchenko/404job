import { NextRequest, NextResponse } from 'next/server';
import { isAxiosError } from 'axios';
import { api } from '../../api';
import { VacancyByIdResponse } from '@/lib/vacanciesApi';

interface RouteParams {
  params: Promise<{ vacancyId: string }>;
}

export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const { vacancyId } = await params;

    if (!vacancyId) {
      return NextResponse.json(
        { error: 'Vacancy ID is required' },
        { status: 400 },
      );
    }

    const response = await api.get<VacancyByIdResponse>(
      `/vacancies/${vacancyId}`,
    );

    return NextResponse.json(response.data, { status: 200 });
  } catch (error) {
    if (isAxiosError(error)) {
      return NextResponse.json(
        {
          error: error.message,
          backendError: error.response?.data,
        },
        { status: error.response?.status || 500 },
      );
    }

    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 },
    );
  }
}
