import axios from "axios";
import { TryCatch } from "../lib/TryCatch";
import * as cheerio from 'cheerio';
import { ErrorHandler } from "../lib/ErrorHandler";
import yahooFinance from 'yahoo-finance2';


interface StockInfo {
  name: string;
  change: string;
}

export const getStockOrMarketData = TryCatch(async(req,res,next)=>{
    const { symbol, period1, period2, interval } = req.query;
      const url = `https://query1.finance.yahoo.com/v8/finance/chart/${symbol}?period1=${period1}&period2=${period2}&interval=${interval}`;
      
      const response = await axios.get(url);
      return res.json(response.data);
});

export const getTopGainers = TryCatch(async(req,res,next)=>{
  const url = 'https://www.nseindia.com/api/live-analysis-variations?index=gainers';

  const response = await axios.get(url, {
      headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.107 Safari/537.36',
          'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8',
          'Accept-Language': 'en-US,en;q=0.9',
          'Connection': 'keep-alive',
          'DNT': '1',
          'Upgrade-Insecure-Requests': '1',
      },
  });

  console.log(response.data);

  
  // Parsing the response to get the top gainers
  const topGainers = response.data.data.map((stock:any) => ({
      symbol: stock.symbol,
      name: stock.meta.companyName,
      lastPrice: stock.priceInfo.lastPrice,
      change: stock.priceInfo.change,
      percentageChange: stock.priceInfo.pChange,
  }));

  console.log(topGainers);

  return res.json({ gainers : response.data });

});

export const searchStocks = TryCatch(async(req,res,next)=>{
  const query = req.query.q as string;

  if (!query) {
      return next(new ErrorHandler(400, 'Please provide a search query'));
  }

      const response = await axios.get(`https://query1.finance.yahoo.com/v1/finance/search`, {
          params: {
              q: query,
              quotesCount: 5,
              newsCount: 0,
              enableFuzzyQuery: false,
              quotesQueryId: 'tss_match_phrase_query',
              multiQuoteQueryId: 'multi_quote_single_token_query',
              region: 'US',
              lang: 'en-US',
          },
      });

      const stocks = response.data.quotes.map((quote: any) => ({
          symbol: quote.symbol,
          name: quote.shortname || quote.longname,
      }));

      return res.json(stocks);

})

