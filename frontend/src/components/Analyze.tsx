"use client"
import { ANALYZE_STOCK } from '@/apiUrl';
import axios from 'axios';
import { Loader2, X } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';

interface AnalyzeProps {
    symbol: string;
    handleClose: () => void;
}

const Analyze: React.FC<AnalyzeProps> = ({ symbol, handleClose }) => {
    const [loading, setLoading] = useState<boolean>(false);
    const [sentiment, setSentiment] = useState<string | null>(null);
    const [imageData, setImageData] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchData() {
            setLoading(true);
            setError(null);  // Clear any previous errors
            try {
                const response = await axios.get(`${ANALYZE_STOCK}?symbol=${symbol}`);
                const data = response.data;
                setSentiment(data['Final Conclusive Sentiment']);  
                setImageData(data.Image);  // Base64-encoded image data
            } catch (error) {
                if (axios.isAxiosError(error)) {
                    setError(`Error: ${error.response?.status} - ${error.response?.statusText}`);
                } else {
                    setError('An unexpected error occurred');
                }
                console.error('Error fetching data:', error);
            }
            setLoading(false);
        }

        fetchData();
    }, [symbol]);

    return (
        <div className='relative min-h-[10rem]'>
            <div className='flex flex-col justify-center items-center h-full'>
                {loading ? (
                    <Loader2 className='h-10 w-10 text-black' />
                ) : error ? (
                    <p className='text-red-500'>{error}</p>
                ) : (
                    <div className='text-center'>
                        <p className='text-black mb-4'>{sentiment}</p>
                        {imageData && (
                            <img 
                                src={'/stock_predictions.png'} 
                                alt="Prediction" 
                                className='w-full max-w-[500px]' 
                            />
                        )}
                    </div>
                )}
            </div>

            <button 
                className="absolute right-4 top-1 rounded-full border h-8 w-8 flex justify-center items-center" 
                onClick={handleClose}
            >
                <X className='h-5 w-5 text-black' />
            </button>
        </div>
    );
}

export default Analyze;
