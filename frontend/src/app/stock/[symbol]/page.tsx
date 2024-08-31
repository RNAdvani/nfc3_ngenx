import Watchlist from '@/components/watchlist/Watchlist';
import { auth } from '@/auth';



interface Props {
  params: { symbol: string };
}

const SingleStockPage: React.FC<Props> = async ({params}) => {

 const session = await auth();

<<<<<<< Updated upstream
 
=======
  const [handleOpenDialog] = useDialog(dialogRef);

  const handleCloseDialog = () => {
    if(dialogRef.current){
      dialogRef.current.close();
    }
  }
>>>>>>> Stashed changes

    
  return (
<<<<<<< Updated upstream
    <Watchlist stock={params.symbol} userId={session?.user.id!} />
=======
    <div className='w-full flex justify-center items-center'>
        <div className='flex w-full gap-2 overflow-hidden p-6 items-center'>
           <BigStockChart symbol={symbol} className='h-[25rem]' />
        </div>
          <Button onClick={handleOpenDialog} className='bg-darkgreen mr-2'>Analyze</Button>
          <CustomDialog ref={dialogRef} preventDefault>
            <Analyze handleClose={handleCloseDialog} symbol={symbol} />
          </CustomDialog>
    </div>
>>>>>>> Stashed changes
  )
}

export default SingleStockPage