import React, { useState } from 'react'
import Card from '../components/Card'
import Button from '../components/Button'
import { supabase } from '../supabaseClient'

const Login: React.FC = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsLoading(true)

    try {
      console.log('Signing in...', { email })

      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      console.log('Login result:', data, error)

      if (error) {
        console.error('Login error:', error)
        alert('Login failed')
        return
      }

      alert('Saved successfully')
    } catch (error) {
      console.error('Unexpected login error:', error)
      alert('Login failed')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-white dark:bg-primary flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-primary dark:text-accent mb-2">
            Welcome Back
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Sign in to your Traveloop account
          </p>
        </div>

        <form className="space-y-4" onSubmit={handleLogin}>
          <div>
            <label className="block text-sm font-medium text-primary dark:text-white mb-2">
              Email
            </label>
            <input
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-light dark:border-secondary bg-gray-50 dark:bg-primary dark:text-white focus:outline-none focus:ring-2 focus:ring-accent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-primary dark:text-white mb-2">
              Password
            </label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-light dark:border-secondary bg-gray-50 dark:bg-primary dark:text-white focus:outline-none focus:ring-2 focus:ring-accent"
            />
          </div>

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? 'Signing In...' : 'Sign In'}
          </Button>

          <p className="text-center text-gray-600 dark:text-gray-400 text-sm">
            Don't have an account?{' '}
            <a href="/signup" className="text-accent font-semibold hover:underline">
              Sign up
            </a>
          </p>
        </form>
      </Card>
    </div>
  )
}

export default Login
