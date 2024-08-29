import axios from "axios";
import { TryCatch } from "../lib/TryCatch";

export const analyze = TryCatch(async(req, res, next) => {
    const {symbol} = req.query;

    const response = await axios.get(`http://127.0.0.1:8000/sentiment?company=${symbol}`);

    return res.status(200).json(response.data);
})