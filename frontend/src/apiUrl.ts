const baseUrl = 'http://localhost:4000';
const version = "api/v1"

export const GET_STOCK_DATA = `${baseUrl}/${version}/stocks/stockData`;
export const GET_TOP_GAINERS = `${baseUrl}/${version}/stocks/top-gainers`;
export const SEARCH_STOCKS = `${baseUrl}/${version}/stocks/search`;
export const ANALYZE_STOCK = `${baseUrl}/${version}/stocks/analyze`;