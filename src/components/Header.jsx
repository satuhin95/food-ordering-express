import Logo from '../assets/images/logo3.png'
import Icon from '../assets/images/cart2.png'
import {Link} from 'react-router-dom'
import { BsFillHandbagFill } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Button from './elements/Button';
export const  Header = ({cartCount})=> {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const handleLogout =()=>{
    sessionStorage.removeItem('Auth Token');
    sessionStorage.removeItem('User Id');
    window.dispatchEvent(new Event("storage"))
    navigate('/');
  }
  useEffect(()=>{
    const checkAuthToken=()=>{
      const token = sessionStorage.getItem('Auth Token');
      if(token){
        setIsLoggedIn(true);
      }else{
        setIsLoggedIn(false);
      }
    }
    window.addEventListener('storage',checkAuthToken);
    return ()=>{
      window.removeEventListener('storage',checkAuthToken);
    }
  },[])
  return (
    <nav id="header" className="bg-black text-white">
        <div className="w-full container mx-auto flex flex-wrap items-center justify-between mt-0 py-2">
            <div className="logo-wrapper pl-4 flex items-center">
              <Link to="/" className='toggleColor text-white no-underline hover:no-underline font-bold text-2xl lg:text-4xl'>
              <img src={Logo} alt="logo" className='w-20 h-20 '/>
              </Link>
                
            </div>
            <div className="nav-menu-wrapper flex items-center justify-between space-x-10">
                <Link to="/" className='text-xl'>Home</Link>
                <Link to="#about" className='text-xl'>About</Link>
            </div>
            <div className="flex items-center justify-center space-x-4">
               <Link to="/cart" className='text-xl mr-4 relative'>
                <BsFillHandbagFill/>
                {/* <img src={Icon} alt="cart" className='w-10 h-10' /> */}
                {cartCount > 0 ? <div className='rounded-full bg-yellow-400 inline-flex text-white items-center justify-center w-full absolute -top-1 -right-1'>{cartCount}</div>:null}
               </Link>
               {
                isLoggedIn?
                <Button onClick={handleLogout}>Log Out</Button>:
                (
                  <>
                      <Link to="/login" className='text-xl'>Log In</Link>
                     <Link to="/register" className='text-xl'>Sign Up</Link>
                  </>
                )
               }
               

            </div> 
        </div>
    </nav>
  )
}
