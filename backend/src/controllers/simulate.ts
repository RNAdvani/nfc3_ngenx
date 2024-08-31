import axios from "axios";
import { TryCatch } from "../lib/TryCatch";

export const simulate = TryCatch(async(req, res, next) => {
    const {symbol} = req.body;

    const response = await axios.post(`http://127.0.0.1:8000/simulate`,{
        symbol,
        initial_capital:"",
        investment_fraction:"",
        stop_loss_threshold:"",
        profit_target:""
    });

    return res.status(200).json(response.data);
})