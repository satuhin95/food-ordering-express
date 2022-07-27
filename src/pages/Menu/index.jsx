import { useEffect,useState } from "react";
import { useDispatch ,useSelector} from "react-redux";
import { fetchProducts, selectAllProducts } from "../../stores/menu/productsSlice";
import { fetchcategories,selectAllCategories } from "../../stores/menu/categorySlice";
import ProductDetailCard from "../../components/ProductDetailCard";
import Tabs from "../../components/Tabs";
import {addToCart} from '../../stores/cart/cartSlice'
const Menu =()=>{
    const dispatch = useDispatch();
    const products = useSelector(selectAllProducts)
    // const myCategories = useSelector(selectAllCategories)
    const [activeTab,setActiveTab] = useState('');
    // const [categories,setCategories] = useState([]);
    const [activeTabIndex, setActiveTabIndex] = useState(0)
    useEffect(()=>{
        dispatch(fetchProducts());
        dispatch(fetchcategories());
    }, [])
    
    const onAddProduct =(product)=>{
        dispatch(addToCart(product));
      }
    const onTabSwitch =(newActiveTab)=>{
        setActiveTab(newActiveTab);
        // let newIndex = 0;
        let categories = products.products.map((product)=>product.name.name);
        let index = categories.findIndex(category =>newActiveTab ===category);
        if(index > -1){
            setActiveTabIndex(index);
        }else{
            setActiveTabIndex(0);
        }
    }  
    return(
        <div className="bg-white">
            {
                products.status !=='fulfilled' ?
                <div>Loading...</div>:
                <div className="menu-wrapper">
                
                        {
                            products.products &&
                            <Tabs 
                                list={products.products.map((product)=>product.name.name)}
                                activeTab={activeTab}
                                onTabSwitch={onTabSwitch}
                            />
                        }
        
                    <div className="flex flex-row mx-3 ">
                        {products.products && products.products[activeTabIndex].products.map((item,ind)=>{
                            return(
                                <ProductDetailCard key={ind} product={item} onAddProduct={onAddProduct}/>
                            )
                        })}
                    </div>
                </div>
            }
        </div>
    )
}
export default Menu;