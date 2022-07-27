import React from 'react'
import { useSelector } from 'react-redux/es/exports'
import { cartProduct } from '../stores/cart/cartSlice'
import ProductSummaryCart from './ProductSummaryCart';
export default function ProductsSummary() {
    const cart = useSelector(cartProduct);
  return (
    <div className='flex flex-col'>
        {cart && cart?.map((product,index)=>{
            return(
                <ProductSummaryCart product={product} key={index}/>
            )
        })

        }
        
    </div>
  )
}
