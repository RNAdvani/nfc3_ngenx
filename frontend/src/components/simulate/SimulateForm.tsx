import React, { useCallback, useEffect, useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from "zod"
import { useForm } from 'react-hook-form'
import { Form,FormControl,FormField,FormItem,FormLabel,FormMessage, } from "@/components/ui/form"
import { SimulateSchema } from '@/utils'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { SEARCH_STOCKS, SIMULATE } from '@/apiUrl'
import axios from 'axios'

interface searchItem {
    symbol: string;
    name: string;
  }
  
  const SearchItem = ({name,setsymbol,symbol}:searchItem&{setsymbol(sys:string):void})=>{
      return (
          <div onClick={()=> setsymbol(symbol)}  className="flex cursor-pointer  items-center space-x-2 p-4">
              <p className="text-darkgreen font-semibold">{name}</p>
              <p className="text-lightgreen">{symbol}</p>
          </div>
      )
  }


const SimulateForm = () => {

    const [isLoading, setIsLoading] = useState(false);
    const [result, setResult] = useState(false);

    const form = useForm<z.infer<typeof SimulateSchema>>({
        resolver: zodResolver(SimulateSchema),
        defaultValues:{
            amount:0,
            fraction_of_amount:0,
            profit_percentage:10,
            loss_percentage: 5
        }
    });

    const onSubmit =async (values: z.infer<typeof SimulateSchema>)=>{
        setIsLoading(true);
        const {amount,fraction_of_amount,profit_percentage,loss_percentage} = values;


       try {
        const res = await axios.post(SIMULATE,{
            symbol,
            initial_capital:amount,
            investment_fraction:fraction_of_amount,
            stop_loss_threshold:loss_percentage,
            profit_target:profit_percentage,
        });
        setResult(res.data);
       } catch (error) {
        console.log(error);
       }
       setIsLoading(false);
        
     }
     const [query, setQuery] = useState("");
     const [searchResults, setSearchResults] = useState<searchItem[]>([]);
     const [symbol, setSymbol] = useState("");
   
     const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
       setQuery(event.target.value);
     };
   

   
     const handleSearch = useCallback(async()=>{
         try {
           const res = await axios.get(SEARCH_STOCKS, {
             params: {
               q:query,
             },
           });
           console.log(res.data);
           setSearchResults(res.data);
         } catch (error) {
           console.log(error);
         }
     },[query])
   
     useEffect(()=>{
       if(query){
         handleSearch();
       }
     },[query])

     const setCompany = (symbol:string)=>{
         setSymbol(symbol);
         setQuery("");
         setSearchResults([]);
      }
  return (
    result ? <div>

    </div> :  <div className='bg-background p-4 rounded-lg'>
         <Form {...form} >
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
                <div className="space-y-4">
                <Input
          type="text"
          onChange={handleChange}
          placeholder="Search..."
          className="w-full placeholder:text-verylightgreen py-2 pl-10 pr-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-[#000c08] text-white"
        />
        {query && searchResults && <div className="absolute bg-background mt-1 rounded-lg w-full max-h-[10rem] overflow-y-scroll no-scrollbar">
            {
              searchResults.map((item,index)=>(
                <SearchItem setsymbol={setCompany} key={index} name={item.name} symbol={item.symbol} />
              ))
            }
        </div>}
                    <FormField control={form.control} name='amount' render={({field})=>(
                        <FormItem>
                            <FormLabel>Amount</FormLabel>
                            <FormControl>
                                <Input {...field} placeholder='9999' /> 
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )} />
                    <FormField control={form.control} name='fraction_of_amount' render={({field})=>(
                        <FormItem>
                            <FormLabel>Fraction of amount</FormLabel>
                            <FormControl>
                                <Input {...field} placeholder='9999' type='number'  /> 
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )} />
                    <FormField control={form.control} name='profit_percentage' render={({field})=>(
                        <FormItem>
                            <FormLabel>Profit percentage</FormLabel>
                            <FormControl>
                                <Input {...field}  placeholder='9999' type='number' min={5} max={100} /> 
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )} />
                    <FormField control={form.control} name='loss_percentage' render={({field})=>(
                        <FormItem>
                            <FormLabel>Loss Percentage</FormLabel>
                            <FormControl>
                                <Input {...field}  placeholder='9999' type='number' min={5} max={100} /> 
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )} />
                    <Button
                        type='submit'
                        className='w-full'
                    >
                        Simulate
                    </Button>
                </div>
            </form>
        </Form>
    </div>
  )
}

export default SimulateForm