import { TryCatch } from "../lib/TryCatch";
import Watchlist from "../models/watchlist";


export const createWatchlist = TryCatch(async (req, res, next) => {
    const { userId } = req.body;

    const newWatchlist = await Watchlist.create({
        userId,
        words: []
    });

    return res.status(201).json({ message: "Watchlist created successfully", watchlist: newWatchlist });
});

export const addWatchlistStock = TryCatch(async (req, res, next) => {
    const { userId, stock } = req.body;

    const watchlist = await Watchlist.findOne
    ({
        userId
    });

    if (!watchlist) {
        return res.status(404).json({ message: "Watchlist not found" });
    }

    watchlist.stocks.push(stock);

    await watchlist.save();

    return res.status(200).json({ message: "Stock added to watchlist successfully", watchlist });
});

export const removeWatchlistStock = TryCatch(async (req, res, next) => {
    const { userId, stock } = req.body;

    const watchlist = await Watchlist.findOne({
        userId
    });

    if (!watchlist) {
        return res.status(404).json({ message: "Watchlist not found" });
    }

    watchlist.stocks = watchlist.stocks.filter((s) => s !== stock);

    await watchlist.save();

    return res.status(200).json({ message: "Stock removed from watchlist successfully", watchlist });

});
