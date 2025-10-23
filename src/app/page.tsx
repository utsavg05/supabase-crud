"use client"
import Auth from '@/components/auth'
import TaskManager from '@/components/task-manager'
import { supabase } from '@/supabase-client';
import React, { useEffect, useState } from 'react'

const Home = () => {
  const [session, setSession] = useState<any>(null);

  const fetchSession = async () => {
    const currentSession = await supabase.auth.getSession();
    console.log(currentSession)
    setSession(currentSession.data.session)
  }

  useEffect(() => {
    fetchSession();

    const {data: authListener} = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    })

    return () => {
      authListener.subscription.unsubscribe();
    }
  }, [])

  const logout = async () => {
    await supabase.auth.signOut();
  }

  return (
    <>
    {session ? <>
    <button className='fixed top-4 left-5 rounded bg-red-500 text-white px-2 py-4 active:bg-red-800' onClick={logout}>LogOut</button>
    <TaskManager session={session}/>
    </> : <>
    <Auth />
    </>}
    </>
  )
}

export default Home