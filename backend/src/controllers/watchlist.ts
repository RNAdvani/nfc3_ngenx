import { ErrorHandler } from "../lib/ErrorHandler";
import { TryCatch } from "../lib/TryCatch";
import Watchlist from "../models/watchlist";


export const createWatchlist = TryCatch(async (req, res, next) => {
    const { userId } = req.body;

    const newWatchlist = await Watchlist.create({
        userId,
        words: []
    });

    return res.status(201).json({ success:true ,message: "Watchlist created successfully", watchlist: newWatchlist });
});

export const addWatchlistStock = TryCatch(async (req, res, next) => {
    const { userId, stock } = req.body;

    const watchlist = await Watchlist.findOne
    ({
        userId
    });

    if (!watchlist) {
        return next(new ErrorHandler(404,"Watchlist not found"));
    }

    watchlist.stocks.push(stock);

    await watchlist.save();

    return res.status(200).json({ success:true ,message: "Stock added to watchlist successfully", watchlist });
});

export const removeWatchlistStock = TryCatch(async (req, res, next) => {
    const { userId, stock } = req.body;

    const watchlist = await Watchlist.findOne({
        userId
    });

    if (!watchlist) {
        return next(new ErrorHandler(404,"Watchlist not found"));
    }

    watchlist.stocks = watchlist.stocks.filter((s) => s !== stock);

    await watchlist.save();

    return res.status(200).json({success:true, message: "Stock removed from watchlist successfully", watchlist });

});

export const getWatchlist = TryCatch(async (req, res, next) => {
    const { userId } = req.body;

    const watchlist = await Watchlist.findOne({
        userId
    });

    if (!watchlist) {
        return next(new ErrorHandler(404,"Watchlist not found"));
    }

    return res.status(200).json({success:true, watchlist });

});
