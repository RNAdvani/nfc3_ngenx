import express from 'express';
import { getStockOrMarketData, getTopGainers, searchStocks } from '../controllers/yahoo';
const router = express.Router();


router.get("/stockData",getStockOrMarketData);
router.get("/top-gainers",getTopGainers);
router.get("/search",searchStocks);



export { router as yahooRoutes };