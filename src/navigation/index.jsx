import { BrowserRouter,Route,Routes } from "react-router-dom";
import { Header } from "../components/Header";
import Home from "../pages/Home/Index";
import Login from '../pages/Login';
import Cart from '../pages/Cart';
import Register from '../pages/Register';
import PaymentSuccess from '../pages/PaymentSuccess';
import Menu from '../pages/Menu';
import { cartProduct } from "../stores/cart/cartSlice";
import { useSelector } from "react-redux";
import Footer from "../components/Footer";
const Navigation =()=>{
    const productsInCart = useSelector(cartProduct);
    return(
        <BrowserRouter>
            <Header cartCount={productsInCart ? productsInCart.length : 0} />
            <Routes>
                <Route path="/" element={<Home/>} />
                <Route path="/cart" element={<Cart/>} />
                <Route path="/login" element={<Login/>} />
                <Route path="/register" element={<Register/>} />
                <Route path="/menu" element={<Menu/>} />
                <Route path="/paymentsuccess" element={<PaymentSuccess/>} />

            </Routes>
            <Footer/>
        </BrowserRouter>
    )
}
export default Navigation;