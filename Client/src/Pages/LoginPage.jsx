import React, {useContext, useState} from 'react'
import assets from './../assets/assets';
import { AuthContext } from '../../context/AuthContext';

const LoginPage = () => {

  // Controls whether user is on "Sign up" or "Login"
  const [currState, setCurrState] = useState("Login")

  // Form input states
  const [fullName, setFullName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [bio, setBio] = useState("")

  // Controls multi-step form (step 1 → step 2) (it avoiding the multiple pages for sign up and login)
  const [isDataSubmitted, setIsDataSubmitted] = useState(false)



  const {login} = useContext(AuthContext);

   // Handles form submission and step switching
  const onSubmitHandler = (event)=>{
    event.preventDefault();

     // Step 1 → Step 2 for Sign up
    if(currState === 'Sign up' && !isDataSubmitted){
      setIsDataSubmitted(true);
      return;
    }

    login(currState === "Sign up" ? 'Signup': 'login', {fullName, email, password, bio})

  }

  return (
    // Main page layout container
    <div className="min-h-screen bg-cover flex items-center justify-center gap-8 
      sm:justify-evenly max-sm:flex-col backdrop-blur-2xl">
      
      {/* left side  (logo ) */}
      <img src={assets.logo_big} alt="" className='w-[min(30vw, 250px)]' />

      {/* right side authentication form  */}
      <form 
        onSubmit={onSubmitHandler}  
        className='border-2 bg-white/8 text-white border-gray-500 p-6 flex flex-col gap-6 rounded-lg shado-lg'>

          {/* Form header and back arrow for step navigation */}
          <h2 className='font-medium text-2xl flex justify-between items-center'>

              {currState}

              {/* Back arrow appears only on step 2 */}
              {
                isDataSubmitted && <img onClick={()=>setIsDataSubmitted(false)} src={assets.arrow_icon} alt="" 
                className='w-5 cursor-pointer' />
              }
          </h2>

          {/* Sign up box  */}

           {/* Full Name input (Sign up – Step 1 only) */}
          {
            currState === "Sign up" && !isDataSubmitted &&(
              <input 
                onChange ={(e)=>setFullName(e.target.value)} 
                value = {fullName} 
                type="text" 
                className='p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500' 
                placeholder ="Full Name" 
                required  
              /> 
              
              ) 
          }

          {/* Email & Password inputs (Login + Sign up – Step 1) */}
          {
            !isDataSubmitted &&(
              <>
                <input 
                  onChange ={(e)=>setEmail(e.target.value)} 
                  value = {email} 
                  type="email" 
                  className='p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500' 
                  placeholder ="Email" 
                  required  
                />

                  <input 
                  onChange ={(e)=>setPassword(e.target.value)} 
                  value = {password} 
                  type="password" 
                  className='p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500' 
                  placeholder ="Password" 
                  required  
                />
                
              </>
            )
          }
           {/* text area Bio input (Sign up – Step 2 only) */}
          {
              currState === "Sign up" && isDataSubmitted &&(
              <textarea rows={4}
                onChange={(e)=>setBio(e.target.value)} 
                value={bio}
                className='p-2 resize-none border-2 border-gray-500 rounded-md focus:outline-none focus:ring-2 focus-indigo-500' 
                placeholder='Provide a short bio...' 
                required >
              </textarea>
            )
          }

           {/* Submit button changing background from purple to violet */}
          <button 
            type='submit'
            className='py-3 bg-gradient-to-r from-purple-400 to-violet-600 text-white rounded-md cursor-pointer ' 
          >
            {currState === "Sign up" ? "Create Account" : "Login Now" }
          </button>

          {/*checkbox for Terms and privacy agreement */}
          <div className='flex items-center gap-2 text=sm text-gray-500' >
            <input type="checkbox"  />
            <p>Agree to the terms of use & privacy policy.</p>
          </div>

        {/* Toggle between Login and Sign up */}  
          <div className='flex flex-col gap-2'>
            {
              currState === "Sign up" ? 
              (
                <p className='text-sm text-gray-600' > 
                  Alredy have an account?
                  <span 
                    onClick={()=>{
                      setCurrState('Login'); 
                      setIsDataSubmitted(false);
                    }}
                    className='font-medium text-violet-500 cursor-pointer' >
                    Login here
                  </span>  
                </p>
              ) : (
                <p className='text-sm text-gray-600'>
                  Create an account 
                  <span 
                    onClick={()=>{
                      setCurrState('Sign up'); 
                      setEmail("");
                      setPassword("");
                    }} 
                    className='font-medium text-violet-500 cursor-pointer' >
                    Click here
                  </span>
                </p>
              )
            }
          </div>

      </form>
    </div>
  )
}

export default LoginPage