import { NextRequest } from 'next/server';
import { save } from '@/lib/api';
import { letterSchema } from '@/lib/validation';
export const runtime = 'nodejs';
export async function POST(req: NextRequest) {
  return save(req, letterSchema, 'letters');
}