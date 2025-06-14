"use client"
import React, { ChangeEvent, FormEvent, useState } from 'react';
import UserServices from '@/services/user.services';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { cookieUtils } from '@/utils/cookieUtils';
import { useDispatch } from 'react-redux';
import { setUser } from '@/lib/features/user/userSlice';

// Define interfaces for our types


const UserLogin: React.FC = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const router = useRouter()
  const userservices = UserServices
  const dispatch = useDispatch()


  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newUser = {
      fullName: {
        firstName: firstName,
        lastName: lastName
      },
      email: email,
      password: password
    }

    try {
      const response = await userservices.registerUser(newUser)

      if (response.status == "success") {
        const data = response.data
        cookieUtils.setSecureCookie("cabtoken",data.token);
        dispatch(setUser(data.user));
        router.push('/home');
      }

      setEmail('')
      setFirstName('')
      setLastName('')
      setPassword('')
    } catch (error) {
      console.error("Login error:", error)
    }
  }

  return (

    <div className='p-7 pb-2 h-screen flex flex-col justify-between bg-white text-black'>
      <div>
        <img className='w-16 mb-10' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYQy-OIkA6In0fTvVwZADPmFFibjmszu2A0g&s" alt="" />

        <form onSubmit={(e) => {
          submitHandler(e)
        }}>

          <h3 className='text-lg w-1/2  font-medium mb-2'>What's your name</h3>
          <div className='flex gap-4 mb-7'>
            <input
              required
              className='bg-[#eeeeee] w-1/2 rounded-lg px-4 py-2 border  text-lg placeholder:text-base'
              type="text"
              placeholder='First name'
              value={firstName}
              onChange={(e) => {
                setFirstName(e.target.value)
              }}
            />
            <input
              required
              className='bg-[#eeeeee] w-1/2  rounded-lg px-4 py-2 border  text-lg placeholder:text-base'
              type="text"
              placeholder='Last name'
              value={lastName}
              onChange={(e) => {
                setLastName(e.target.value)
              }}
            />
          </div>

          <h3 className='text-lg font-medium mb-2'>What's your email</h3>
          <input
            required
            value={email}
            onChange={(e) => {
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
            onChange={(e) => {
              setPassword(e.target.value)
            }}
            required type="password"
            placeholder='password'
          />

          <button
            className='bg-[#111] text-white font-semibold mb-3 rounded-lg px-4 py-2 w-full text-lg placeholder:text-base'
          >Create account</button>

        </form>
        <p className='text-center'>Already have a account? <Link href='/user/login' className='text-blue-600'>Login here</Link></p>
      </div>
      <div>
        <p className='text-[10px] leading-tight'>This site is protected by reCAPTCHA and the <span className='underline'>Google Privacy
          Policy</span> and <span className='underline'>Terms of Service apply</span>.</p>
      </div>
    </div>

  )
}

export default UserLogin;