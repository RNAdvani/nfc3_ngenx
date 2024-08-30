import Watchlist from '@/components/watchlist/Watchlist';
import { auth } from '@/auth';



interface Props {
  params: { symbol: string };
}

const SingleStockPage: React.FC<Props> = async ({params}) => {

 const session = await auth();

 

    
  return (
    <Watchlist stock={params.symbol} userId={session?.user.id!} />
  )
}

export default SingleStockPage