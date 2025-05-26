"use client"
import React, { useState, ChangeEvent, FormEvent } from 'react'

import axios from 'axios'
import Link from 'next/link';
import UserServices from '@/services/user.services';
import { useRouter } from 'next/navigation';
import { cookieUtils } from '@/utils/cookieUtils';
import { useDispatch } from 'react-redux';
import { setUser } from '@/lib/features/user/userSlice';

// Define interfaces for our types


const UserLogin: React.FC = () => {
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [userData, setUserData] = useState<Record<string, any>>({});
  const router = useRouter()
  const userservices = UserServices;
  const dispatch = useDispatch();

  console.log(process.env.NEXT_PUBLIC_API_BASE_URL);

  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const userData: UserData = {
      email: email,
      password: password
    }

    try {
      const response = await userservices.loginUser(userData)
      
      if (response.status=="success") {
        const data = response.data
        cookieUtils.setCookie("cabtoken",data.token,{expires:7});
        dispatch(setUser(data.user));
        router.push('/home');
      }
      
      setEmail('')
      setPassword('')
    } catch (error) {
      console.error("Login error:", error)
      // Handle error here
    }
  }

  return (
    <div className='p-7 pb-2 h-screen flex flex-col justify-between bg-white text-black'>
      <div>
        <img className='w-16 mb-10' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYQy-OIkA6In0fTvVwZADPmFFibjmszu2A0g&s" alt="" />
        <form onSubmit={submitHandler}>
          <h3 className='text-lg font-medium mb-2'>What's your email</h3>
          <input
            required
            value={email}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              setEmail(e.target.value)
            }}
            className='bg-[#eeeeee] mb-7 rounded-lg px-4 py-2 border w-full text-lg placeholder:text-base'
            type="email"
            placeholder='email@example.com'
          />
          <h3 className='text-lg font-medium mb-2'>Enter Password</h3>
          <input
            className='bg-[#eeeeee] mb-7 rounded-lg px-4 py-2 border w-full text-lg placeholder:text-base'
            value={password}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              setPassword(e.target.value)
            }}
            required 
            type="password"
            placeholder='password'
          />
          <button
            className='bg-[#111] text-white font-semibold mb-3 rounded-lg px-4 py-2 w-full text-lg placeholder:text-base'
            type="submit"
          >
            Login
          </button>
        </form>
        <p className='text-center'>New here? <Link href='/user/signup' className='text-blue-600'>Create new Account</Link></p>
      </div>
      <div>
        <Link
          href='/captain/login'
          className='bg-[#277da1] flex items-center justify-center text-white font-semibold mb-5 rounded-lg px-4 py-2 w-full text-lg placeholder:text-base'
        >
          Sign in as Captain
        </Link>
      </div>
    </div>
  )
}

export default UserLogin;