import { Link } from 'react-router-dom'

export default function Signup() {
  return (
    <>
     <div className='w-full h-screen flex justify-center items-center text-center'>
        <form className='w-96 h-80 flex flex-col items-center bg-sky-900 rounded-md p-12'>
          <p className='text-3xl mb-4 font-semibold'>Login</p>
          <input 
          className='w-full border-b-2 rounded-full mt-3 p-1 outline-none'
          type="text" placeholder='Email' name='email'/>
          <input 
          className='w-full border-b-2 rounded-full mt-3 p-1 outline-none'
          type="text" placeholder='Password' name='password'/>
          <button
          className='w-full border-2 rounded-full mt-6 p-1 text-blue-600 bg-white'
          >Login</button>
          <p className='mt-3 text-white -ml-20'>Dont have an account <Link to='/signup'><span className='text-blue-400'>Sign Up</span></Link></p>
        </form>
      </div> 
    </>
  )
}
