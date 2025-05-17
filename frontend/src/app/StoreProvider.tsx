'use client'
import { useRef, useEffect } from 'react'
import { Provider, useDispatch } from 'react-redux'
import { store, AppStore } from '../lib/store'
import { getSocket } from '../lib/socket'

export default function StoreProvider({
  children
}: {
  children: React.ReactNode
}) {
  const storeRef = useRef<AppStore | null>(null);
  if (!storeRef.current) {
    storeRef.current = store()
  }

  useEffect(() => {
    // Initialize socket connection once on mount
    getSocket()
  }, [])

  return <Provider store={storeRef.current}>{children}</Provider>
}

