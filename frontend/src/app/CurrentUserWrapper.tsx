"use client"
import { setCaptain } from '@/lib/features/captain/captainSlice';
import { setUser } from '@/lib/features/user/userSlice';
import UserServices from '@/services/user.services';
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';

function CurrentUserWrapper ({
  children
}: {
  children: React.ReactNode
}) {
  const dispatch = useDispatch();
  const userServices = UserServices

  const getCurrentUser = async () => {
    const res = await userServices.getCurrentUser();
    if (res.role == "user") {
      dispatch(setUser(res.currUser));
    } else {
      dispatch(setCaptain(res.currUser as Captain));
    }
  }

  useEffect(() => {
    getCurrentUser()
  }, [])

  return (
    <>
      {children}
    </>
  )
}

export default CurrentUserWrapper