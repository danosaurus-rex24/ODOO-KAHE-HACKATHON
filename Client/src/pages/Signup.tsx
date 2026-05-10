import React from 'react'
import Card from '../components/Card'
import Button from '../components/Button'
js
import { supabase } from '../supabaseClient'

const { error } = await supabase.auth.signUp({
  email: form.email,
  password: form.password
})

const Signup: React.FC = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-primary flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-primary dark:text-accent mb-2">
            Start Your Journey
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Create your Traveloop account today
          </p>
        </div>

        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-primary dark:text-white mb-2">
              Full Name
            </label>
            <input
              type="text"
              placeholder="John Doe"
              className="w-full px-4 py-2 rounded-lg border border-light dark:border-secondary bg-gray-50 dark:bg-primary dark:text-white focus:outline-none focus:ring-2 focus:ring-accent"
            />
          </div>

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

          <Button className="w-full">Create Account</Button>

          <p className="text-center text-gray-600 dark:text-gray-400 text-sm">
            Already have an account?{' '}
            <a href="/login" className="text-accent font-semibold hover:underline">
              Sign in
            </a>
          </p>
        </form>
      </Card>
    </div>
  )
}

export default Signup