import { NextResponse } from 'next/server';

// TODO(власник роуту): реалізувати справжній handler.
// Порожній route.ts ламає `next build` (TS2306: not a module) — це тимчасова заглушка.
export function GET() {
  return NextResponse.json({ message: 'Not implemented' }, { status: 501 });
}
