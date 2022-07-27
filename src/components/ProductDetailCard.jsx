import React from 'react'
import Button from '../components/elements/Button'
export default function ProductDetailCard({product,onAddProduct}) {
  return (
    <div className='p-4 m-4 rounded-lg bg-slate-50'>
        <div className='flex flex-col items-center justify-between'>
            <h2 className='text-3xl'>{product.name}</h2>
            <p className='text-2xl text-gray-500'>
                {product.description}
            </p>
            <div className='flex items-center justify-between'>
                <div className='text-3xl text-black pl-2'>{product.price}</div>

            </div>
        </div>
        <div className='w-full flex items-center justify-center'>
            <img src={product.images} alt={product.name}  className="w-40 h-40 rounded-xl object-cover"/>
        </div>
        <div className='w-full flex items-center justify-center mt-2'>
            <Button onClick={onAddProduct}>Add To Cart</Button>
        </div>
    </div>
  )
}
