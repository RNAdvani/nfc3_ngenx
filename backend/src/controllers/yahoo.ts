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

    const queryOptions = { count: 10 };
    const result = await yahooFinance.trendingSymbols('^NSEI', queryOptions);

    console.log(result);

  return res.json({ message:"Success" });

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

