import { NextRequest, NextResponse } from 'next/server';
import { isAxiosError } from 'axios';
import { api } from '../api';
import { FilterOptionType } from '@/types/vacancyType';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const type = searchParams.get('type') as FilterOptionType | null;

    if (!type) {
      return NextResponse.json(
        { error: 'Missing required "type" parameter' },
        { status: 400 },
      );
    }

    const response = await api.get('/options', {
      params: { type },
    });

    return NextResponse.json(response.data, { status: 200 });
  } catch (error) {
    if (isAxiosError(error)) {
      return NextResponse.json(
        {
          error: 'Backend API Error',
          message: error.message,
          details: error.response?.data,
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
