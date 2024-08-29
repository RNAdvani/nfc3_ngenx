import express from 'express';
import { getStockOrMarketData, getTopGainers, searchStocks } from '../controllers/yahoo';
import { analyze } from '../controllers/analyze';
const router = express.Router();


router.get("/stockData",getStockOrMarketData);
router.get("/top-gainers",getTopGainers);
router.get("/search",searchStocks);
router.get("/analyze",analyze);



export { router as yahooRoutes };