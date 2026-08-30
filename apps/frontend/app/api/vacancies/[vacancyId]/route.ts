import { NextRequest, NextResponse } from 'next/server';

const BACKEND_URL = process.env.BACKEND_API_URL || 'http://localhost:4000/api';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ vacancyId: string }> },
) {
  try {
    const { vacancyId } = await params;

    const response = await fetch(`${BACKEND_URL}/vacancies/${vacancyId}`, {
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-store',
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        { message: data.message || 'Вакансію не знайдено' },
        { status: response.status },
      );
    }

    return NextResponse.json(data, { status: 200 });
  } catch {
    return NextResponse.json(
      { message: 'Внутрішня помилка сервера при отриманні вакансії' },
      { status: 500 },
    );
  }
}
