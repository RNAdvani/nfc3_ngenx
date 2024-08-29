import express from 'express';
import { getWatchlist,addWatchlistStock,removeWatchlistStock } from '../controllers/watchlist';
const router = express.Router();


router.get("/getWatchList",getWatchlist);
router.post("/addStock",addWatchlistStock);
router.get("/removeStock",removeWatchlistStock);


export { router as watchlistRoutes };