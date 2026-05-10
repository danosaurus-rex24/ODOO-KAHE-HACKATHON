import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../supabaseClient'

function Register() {
  const [form, setForm] = useState({
    firstName: '', lastName: '', email: '',
    phone: '', city: '', country: '', password: ''
  })
  const navigate = useNavigate()

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleRegister = async (e) => {
    e.preventDefault()
    const { error } = await supabase.auth.signUp({
      email: form.email,
      password: form.password,
      options: {
        data: {
          name: form.firstName + ' ' + form.lastName,
          phone: form.phone,
          city: form.city,
          country: form.country
        }
      }
    })
    if (error) alert(error.message)
    else navigate('/dashboard')
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold text-center mb-6">Create Account</h2>
        <form onSubmit={handleRegister}>
          <div className="flex gap-2 mb-4">
            <input name="firstName" placeholder="First Name"
              className="w-full border p-2 rounded" onChange={handleChange} />
            <input name="lastName" placeholder="Last Name"
              className="w-full border p-2 rounded" onChange={handleChange} />
          </div>
          <input name="email" type="email" placeholder="Email Address"
            className="w-full border p-2 rounded mb-4" onChange={handleChange} />
          <input name="phone" placeholder="Phone Number"
            className="w-full border p-2 rounded mb-4" onChange={handleChange} />
          <div className="flex gap-2 mb-4">
            <input name="city" placeholder="City"
              className="w-full border p-2 rounded" onChange={handleChange} />
            <input name="country" placeholder="Country"
              className="w-full border p-2 rounded" onChange={handleChange} />
          </div>
          <input name="password" type="password" placeholder="Password"
            className="w-full border p-2 rounded mb-4" onChange={handleChange} />
          <button type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
            Register
          </button>
        </form>
        <p className="text-center mt-4">
          Already have an account?{' '}
          <span className="text-blue-500 cursor-pointer"
            onClick={() => navigate('/')}>
            Login
          </span>
        </p>
      </div>
    </div>
  )
}

export default Register
