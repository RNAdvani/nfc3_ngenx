const baseUrl = 'http://localhost:8000';
const version = "api/v1"

export const GET_STOCK_DATA = `${baseUrl}/${version}/stocks/stockData`;
export const GET_TOP_GAINERS = `${baseUrl}/${version}/stocks/top-gainers`;
export const SEARCH_STOCKS = `${baseUrl}/${version}/stocks/search`;