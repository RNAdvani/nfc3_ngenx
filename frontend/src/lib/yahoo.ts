import yahooFinance from 'yahoo-finance2';
import { StockData } from '@/types';

// Function to fetch stock data
export async function getStockData(symbol: string): Promise<any> {
  try {
    // Fetch stock data without using 'modules'
    const result = await yahooFinance.quote(symbol);
    return result;
  } catch (error) {
    console.error('Error fetching stock data:', error);
    throw error;
  }
}
