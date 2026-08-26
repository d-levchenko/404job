import { NextResponse } from 'next/server';

// TODO(owner of proxy.ts): замінити на реальну логіку (редіректи/гард роутів).
// Порожній файл ламає `next build` і `next dev` у Next 16 — це тимчасова заглушка.
export function proxy() {
  return NextResponse.next();
}
