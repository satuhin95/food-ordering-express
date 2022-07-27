import {CardElement,useElements,useStripe,Elements} from '@stripe/react-stripe-js';
import {loadStripe } from '@stripe/stripe-js';
import { useSelector,useDispatch } from 'react-redux';
import { clearCart,cartProduct } from '../stores/cart/cartSlice';
import {clearAddress, getAddress } from '../stores/userinfo/addressSlice';
import { useNavigate } from 'react-router-dom';
import {useState, useEffect } from 'react';
import Button from './elements/Button'

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);
export const StripeWrapper =()=>{
    return (
        <Elements stripe={stripePromise} >
          <PaymentFrom/>
        </Elements>
      );
}
const PaymentFrom =()=> {
    const [loading, setLoading] = useState(false);
    const [error,setError] = useState(null);
    const dispatch = useDispatch();
    const cart = useDispatch(cartProduct);
    const address = useSelector(getAddress);
    const navigate = useNavigate();
    const elements = useElements();
    const stripe = useState();

    const handleSubmit = async(e)=>{
        e.preventDefault();
        if(!stripe || !elements || !cart?.length || !address){
            return;
        }
        setLoading(true);
        try{
            const {error:backEndError,clientSecret}= await fetch('http://localhost:8000/create-payment-intent',{
                method:"POST",
                headers:{
                    'Content-type':'application/json'
                },
                body:JSON.stringify({
                    paymentMethodType:'card',
                    orderItems:cart,
                    userId:'',
                    shippingAddress:address

                })
            }).then(r=>r.json());
            const {error:stripeError,paymentIntern} = await stripe.confirmCardPayment(
              clientSecret,{
                payment_method:{
                  card:elements.getElement(CardElement)
                }
              }
            )
            if(backEndError || stripeError){
              setError(backEndError||stripeError)
            }else if(paymentIntern.status==='succeeded'){
              dispatch(clearAddress());
              dispatch(clearCart());
              navigate('/payment-success');
            }
        }catch(error){
          console.log(error)
        }
        setLoading(false);
    }

  return (
    <div>
        <form className='md:2/3 md:mx-auto px-2 pt-1' id='payment-form' onSubmit={handleSubmit}>
            <label htmlFor='card-element' className='pt-4 text-2xl md:text-center'>Please enter your card details</label>
           <div className='my-4'>
                <CardElement id='card-element'/>
           </div>
           <div className='flex justify-center p-2'>
              <Button type="submit" disabled={loading}>
                {loading ? "Loading..." : "Pay Now"}
              </Button>
           </div>
            
        </form>
    </div>
  )
}
