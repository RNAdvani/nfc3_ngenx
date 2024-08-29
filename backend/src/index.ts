import axios from "axios";
import express from "express";
import cors from "cors"


const app = express();

app.use(express.json());
app.use(cors({
  origin: 'http://localhost:3000', // Allow only your React app's origin
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Allowed methods
  allowedHeaders: ['Content-Type', 'Authorization'] // Allowed headers
}));

app.get("/",async (req,res)=>{
  res.json("hello");
})

app.get('/api/stockdata', async (req, res) => {
    try {
      const { symbol, period1, period2, interval } = req.query;
      const url = `https://query1.finance.yahoo.com/v8/finance/chart/${symbol}?period1=${period1}&period2=${period2}&interval=${interval}`;
      
      const response = await axios.get(url);
      return res.json(response.data);
    } catch (error) {
      return res.status(500).json({ error: 'An error occurred while fetching stock data' });
    }
  });

app.listen(8000,()=>{
    console.log('Server is running on port 8000');
})