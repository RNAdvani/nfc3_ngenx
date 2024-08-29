import { useRouter } from 'next/router';
import React from 'react'


interface Props {
  params: { symbol: string };
}

const SingleStockPage: React.FC<Props> = ({params}) => {
  const symbol = params.symbol;

  
    // symbol will be an array if using catch-all routes (e.g., [...symbol])
   

    
  return (
    <div>{symbol}</div>
  )
}

export default SingleStockPage