import {combineReducers} from 'redux';
import cartReducers from './cart/cartSlice';
import productReducer from './menu/productsSlice'
// import categoryReducer from './menu/categorySlice'
import addressReducers from './userinfo/addressSlice';

const rootReducer=combineReducers(
    {
        cart: cartReducers,
        products:productReducer,
        address:addressReducers
        // categories:categoryReducer

    }
);


export default rootReducer;