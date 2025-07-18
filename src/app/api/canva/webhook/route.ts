
import { NextResponse } from 'next/server';

/**
 * This endpoint is currently disabled.
 */
export async function POST(request: Request) {
  return NextResponse.json({ message: 'This feature is currently disabled.' }, { status: 403 });
}

export async function GET() {
    return NextResponse.json({ message: 'This feature is currently disabled.' }, { status: 403 });
}
