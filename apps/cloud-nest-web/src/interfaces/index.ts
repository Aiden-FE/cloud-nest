import { AvailableLanguages } from '@/config';
import { NextRequest, NextResponse } from 'next/server';

export interface PageProps {
  params: { lng: AvailableLanguages };
}

export interface AppComponentProps {
  lng?: AvailableLanguages;
}

export type MiddlewareCallback = (() => NextResponse<unknown>) | undefined;
