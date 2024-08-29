import { getStockData } from '@/lib/yahoo';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const symbol = req.nextUrl.searchParams.get('symbol');

  if (!symbol) {
    return NextResponse.json({ error: 'Symbol is required' }, { status: 400 });
  }

  try {
    const data = await getStockData(symbol);
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch stock data' }, { status: 500 });
  }
}