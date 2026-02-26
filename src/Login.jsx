import { useState } from 'react'
import { supabase } from './supabaseClient'
import { Heart } from 'lucide-react'

export default function Login({ onLogin }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleLogin = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    // SUPABASE QUERY FOR LOGIN
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    })

    if (error) {
      setError("Incorrect password, my love. Try again!")
    } else {
      onLogin(data.session)
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-200 to-red-200">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md border-4 border-pink-100">
        <div className="flex justify-center mb-6">
          <Heart className="text-pink-500 w-16 h-16 fill-pink-500 animate-pulse" />
        </div>
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6 font-serif">
          Login to my Heart
        </h2>
        
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-gray-600 mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 border border-pink-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
              placeholder="Enter your email"
              required
            />
          </div>
          <div>
            <label className="block text-gray-600 mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 border border-pink-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
              placeholder="Enter the secret password"
              required
            />
          </div>
          
          {error && <p className="text-red-500 text-center text-sm">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-pink-500 hover:bg-pink-600 text-white font-bold py-3 rounded-lg transition duration-300 shadow-md"
          >
            {loading ? 'Unlocking...' : 'Open'}
          </button>
        </form>
      </div>
    </div>
  )
}