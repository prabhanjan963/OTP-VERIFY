import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import toast from 'react-hot-toast';
import axios from "axios";

export default function Otp() {
  const [otp,setOtp] = useState('');
  const location = useLocation();
  const navigate = useNavigate();
  

  const submitData = async (e) => {
    e.preventDefault()
    if(!otp){
      return toast.error('Please enter OTP!')
    }else if(!/[^a-zA-Z]/.test(otp)){
      return toast.error('Invalid OTP!')
    }else if(otp.length < 6){
      return toast.error('Invalid OTP!')
    }else{
      const userData = {
        otp,email:location.state
      }

      try {
        const { data } = await axios.post('/api/v1/auth/verifyEmail',userData)

        if(data.error){
          toast.error(data.error)
        }else{
          toast.success(data.success)
          navigate('/home')
        }
      } catch (error) {
        toast.error(error)
      }

    }
  }

  return (
    <>
      <div className="w-full h-screen flex justify-center items-center text-center">
        <form className="w-96 h-64 flex flex-col items-center bg-sky-900 rounded-md p-12" onSubmit={submitData}>
          <p className="text-3xl mb-4 font-semibold">Enter your OTP</p>
          <input className="w-full border-b-2 rounded-full mt-3 p-1 outline-none"
            type="text" placeholder="OTP" name="otp" onChange={(e)=>setOtp(e.target.value)}/>

          <button className="w-full border-2 rounded-full mt-6 p-1 text-blue-600 bg-white" 
          type="submit">Verify</button>
        </form>
      </div>
    </>
  );
}
