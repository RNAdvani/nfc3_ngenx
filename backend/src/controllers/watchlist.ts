import { ErrorHandler } from "../lib/ErrorHandler";
import { TryCatch } from "../lib/TryCatch";
import Watchlist from "../models/watchlist";

export const addWatchlistStock = TryCatch(async (req, res, next) => {
    const { userId, stock } = req.body;

    const watchlist = await Watchlist.findOne
    ({
        userId
    });

    if (!watchlist) {
        const newWatchlist = await Watchlist.create({
            userId,
            stocks: [stock]
        });
        return res.status(201).json({ success:true ,message: "Watchlist created successfully", watchlist: newWatchlist });
    }

    if(watchlist.stocks.includes(stock)){
        return next(new ErrorHandler(400, "Stock already exists in watchlist"));
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
    const { userId } = req.query;

    const watchlist = await Watchlist.findOne({
        userId
    });

    if (!watchlist) {
        return res.status(200).json({success:true, watchlist: [] });
    }

    return res.status(200).json({success:true, watchlist });

});
