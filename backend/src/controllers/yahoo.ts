import axios from "axios";
import { TryCatch } from "../lib/TryCatch";
import * as cheerio from 'cheerio';
import { ErrorHandler } from "../lib/ErrorHandler";

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

  const { data } = await axios.get('https://www.moneycontrol.com/stocks/marketstats/nsegainer/index.php'); // Example URL
  const $ = cheerio.load(data);

  console.log(data)

  const gainers: StockInfo[] = [];
  const losers: StockInfo[] = [];

  // Scrape top gainers
  $('#nseGainer tbody tr').each((index, element) => {
      const name = $(element).find('td:nth-child(1)').text().trim();
      const change = $(element).find('td:nth-child(3)').text().trim();
      gainers.push({ name, change });
  });

  // Scrape top losers
  $('#nseLoser tbody tr').each((index, element) => {
      const name = $(element).find('td:nth-child(1)').text().trim();
      const change = $(element).find('td:nth-child(3)').text().trim();
      losers.push({ name, change });
  });

  console.log('Top Gainers:');
  gainers.forEach((stock) => console.log(`Name: ${stock.name}, Change: ${stock.change}`));

  console.log('Top Losers:');
  losers.forEach((stock) => console.log(`Name: ${stock.name}, Change: ${stock.change}`));


  return res.json({ gainers, losers });

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

