import { NextRequest, NextResponse } from 'next/server';
import { isAxiosError } from 'axios';
import { api } from '../../api';
import { VacancyByIdResponse } from '@/lib/vacanciesApi';
import { Vacancy } from '@/types/vacancyType';

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

export async function PATCH(request: NextRequest, { params }: RouteParams) {
  try {
    const { vacancyId } = await params;
    const body = await request.json();

    const response = await api.patch<Vacancy>(`/vacancies/${vacancyId}`, body, {
      headers: {
        cookie: request.headers.get('cookie') ?? '',
      },
    });

    return NextResponse.json(response.data, { status: response.status });
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
