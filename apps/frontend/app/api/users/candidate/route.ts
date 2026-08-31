import { NextRequest, NextResponse } from 'next/server';
import { api } from '../../api';

export const PATCH = async (request: NextRequest) => {
  const body = await request.json();

  const cookie = request.headers.get('cookie');

  const res = await api.patch('/users/candidate', body, {
    headers: {
      Cookie: cookie ?? '',
    },
  });

  return NextResponse.json(res.data, {
    status: res.status,
  });
};
