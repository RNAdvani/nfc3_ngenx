import axios from "axios";
import express from "express";
import cors from "cors"
import { yahooRoutes } from "./routes/yahoo";
import { puppeteer } from "./lib/puppeteer";


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

app.use("/api/v1/stocks",yahooRoutes)

app.listen(8000,()=>{
    console.log('Server is running on port 8000');
})