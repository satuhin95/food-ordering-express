import { useDispatch } from "react-redux";
import { incrementProductAmount,decrementProductAmount } from "../stores/cart/cartSlice";
export default function ProductSummaryCart({product}) {
    const dispatch = useDispatch();
  return (
    <div className='flex p-1 sm:p-2 border-b border-b-gray-200'>
        <div className='product-image m-1 border border-gray-200 rounded-lg w-full sm:w-1/3'>
            <img src={product.images} alt={product.name}/>
        </div>
        <div className='product-info pl-2'>
            <h3>{product.name}</h3>
            <p className='text-gray-600'>{product.description}</p>
        </div>
        <div className='product-price-qt flex flex-col items-center justify-center'>
            <div className='price'>{`${product.price}`}</div>
            <div className='quantity flex'>
                <button className='p-1' disabled={product.amount<=0} onClick={()=> dispatch(incrementProductAmount(product))}>+</button>
                    <span className='p-1'>{product.amount}</span>
                <button className='p-1' disabled={product.amount<=0} onClick={()=> dispatch(decrementProductAmount(product))}>-</button>
            </div>

        </div>
    </div>
  )
}
