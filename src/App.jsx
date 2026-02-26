import { useState, useEffect } from 'react'
import Login from './Login'
import Proposal from './Proposal'
import { supabase } from './supabaseClient'

function App() {
  const [session, setSession] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check active session on load
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
      setLoading(false)
    })

    // Listen for changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })

    return () => subscription.unsubscribe()
  }, [])

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center bg-pink-100">Loading love...</div>
  }

  return (
    <div>
      {!session ? (
        <Login onLogin={setSession} />
      ) : (
        <Proposal session={session} />
      )}
    </div>
  )
}

export default App