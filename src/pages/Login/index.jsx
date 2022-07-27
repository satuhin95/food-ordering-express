import { useState } from "react";
import {useForm} from 'react-hook-form';
import Button from '../../components/elements/Button'
import {app} from '../../firebase-config';
import { getAuth ,signInWithEmailAndPassword  } from "firebase/auth";
import {useNavigate} from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Login =()=>{
    let navigate = useNavigate();
    const {register,handleSubmit, formState: { errors }} = useForm();
    const [loading, setLoading] = useState(false);
    const onSubmit = (data)=>{
        setLoading(true);
        const authentication = getAuth(app);
        let uid = '';
        signInWithEmailAndPassword (authentication,data.name,data.password)
                .then((response)=>{
                    uid = response.user.uid;
                    sessionStorage.setItem('User Id',uid);
                    sessionStorage.setItem('Auth Token',response._tokenResponse.refreshToken);
                    window.dispatchEvent(new Event("storage"))
                    setLoading(false);
                    toast.success("SignIn Successfully !", {
                        position: toast.POSITION.TOP_RIGHT,
                        autoClose:5000,
                        hideProgressBar:false,
                        closeOnClick:true,
                        pauseOnHover:true,
                        draggable:true,
                        progress:undefined,
                        theme:'dark'
                      });
                })
                .catch((error)=>{
                    if(error.code==='auth/wrong-password'){
                        toast.error("Authentication failed");
                    }
                    if(error.code==='auth/wrong-email'){
                        toast.error("Authentication failed");
                    }
                })

    }
    return(
        <div className="h-screen bg-block flex items-center justify-center">
            <div className="rounded-lg max-w-md w-full flex flex-col items-center justify-center relative">
                <div className="absolute inset-0 transition duration-300 animate-pink blur gradient-to-tr from-rose-500 to-yellow-500"></div>
                <div className="p-10 rounded-xl z-10 w-full h-full bg-black">
                    <h2 className="text-3xl">Login</h2>
                    <form className="w-full space-y-6" onSubmit={handleSubmit(onSubmit)}>
                        <div>
                            <label htmlFor="email" className="block text-lg font-medium text-gray-200">Email</label>
                            <input {...register('email', { required: true })} id="email" type="text" className="block appearance-none w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-gray-200 focus:border-gray-200"/>
                            
                        </div>
                        <div>
                            <label htmlFor="password" className="block text-lg font-medium text-gray-200">Password</label>
                            <input {...register('password', { required: true })} id="password" type="text" className="block appearance-none w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-gray-200 focus:border-gray-200"/>
                            
                        </div>
                        <Button size="large">{loading?'Loading':'Login'}</Button>
                    </form>
                    <ToastContainer />
                </div>
            </div>
        </div>
    )
}
export default Login;