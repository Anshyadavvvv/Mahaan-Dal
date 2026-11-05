import { NextRequest } from 'next/server';
import { save } from '@/lib/api';
import { memberSchema } from '@/lib/validation';
export const runtime = 'nodejs';
export async function POST(req: NextRequest) {
  return save(req, memberSchema, 'members');
}