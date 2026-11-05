import { NextRequest } from 'next/server';
import { save } from '@/lib/api';
import { grievanceSchema } from '@/lib/validation';
export const runtime = 'nodejs';
export async function POST(req: NextRequest) {
  return save(req, grievanceSchema, 'grievances');
}