import React from 'react'
import Card from '../components/Card'
import Button from '../components/Button'

const Login: React.FC = () => {
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

        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-primary dark:text-white mb-2">
              Email
            </label>
            <input
              type="email"
              placeholder="your@email.com"
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
              className="w-full px-4 py-2 rounded-lg border border-light dark:border-secondary bg-gray-50 dark:bg-primary dark:text-white focus:outline-none focus:ring-2 focus:ring-accent"
            />
          </div>

          <Button className="w-full">Sign In</Button>

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