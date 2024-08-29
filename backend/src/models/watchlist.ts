import mongoose from "mongoose"

interface IWatchlist extends Document {
    userId: mongoose.Types.ObjectId
    stocks: string[]
}

const WatchlistSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Types.ObjectId,
        required: true,
    },
    stocks: {
        type: [String],
        required: true,
    },
})

export default mongoose.model<IWatchlist>("Watchlist", WatchlistSchema)