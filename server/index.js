const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const router = require('./routes/myRouter');
const userRouter = require('./routes//userRouter');
const db = require('./db');
const dotenv = require('dotenv').config('../.env')
const app = express();

const Order = require('./models/orderModel');
const user = require('./models/userModel');

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)
var corsOptions ={
    origin:"http://localhost:3000"
}
const calculateOrderAmount = (orderItems)=>{
    const initialValue = 0;
    const itemsPrice = orderItems.reduce(
        (previousValue,currentValue)=>
        previousValue + currentValue.price * currentValue.amount, initialValue
    );
    return itemsPrice * 100;
}
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(cors(corsOptions));
app.use(
    express.json({
        verify:function(req,res,buf){
            if(req.originalUrl.startWith('/webhook')){
                req.rowBody = buf.toString();
            }
        },
    })
);
app.post('/webhook', async (req,res)=>{
    let data,eventType;

    //check if webhook signing is configured

    if(process.env.STRIPE_WEBHOOK_SECRET){
        let event;
        let signature = req.headers['stripe-signature'];
        try{
            event = stripe.webhooks.constructEvent(
                req.rowBody,
                signature,
                process.env.STRIPE_WEBHOOK_SECRET
            );
        }catch(e){
            console.log('Webhook signature verification failed.');
            return res.sendStatus(400);
        }
    }else{
        data = req.body.data;
        eventType = req.body.type;
    }
    if(eventType === 'payment_intent.succeeded'){
        console.log('Payment captured');
    }else if(eventType === 'payment_intent.payment_failed'){
        console.log('Payment failed.');
    }
    res.sendStatus(200);
})


app.use(router);
app.use(userRouter);
app.get('/',(req,res)=>{
    res.json({message:"Welcome to food Ordering "})
})
const PORT = process.env.PORT || 8000;
app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`);
})
app.post('/create-payment-intent', async(req,res)=>{
    try{
        const {orderItems, shippingAddress, userId} = req.body;

        const totalPrice = calculateOrderAmount(orderItems);

        const taxPrice = 0;
        const shippingPrice = 0;
        const order = new Order({
            orderItems,
            shippingAddress,
            paymentMethod:'cash',
            totalPrice,
            taxPrice,
            shippingPrice,
            user:''

        })

        // await 
        //order.save();

        // const totalPrice = 100;
        //temp 
        
        const paymentIntent = await stripe.paymentIntents.create({
            amount:totalPrice,
            currency:'usd'
        })
        //todo create order
        res.send({
            clientSecret:paymentIntent.client_secret
        })
    }catch(e){
        res.status(400).json({
            error:{
                message:e.message
            }
        })
    }
})