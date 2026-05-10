import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../supabaseClient'

function CreateTrip() {
  const [form, setForm] = useState({
    trip_name: '', place: '', start_date: '', end_date: '', description: ''
  })
  const navigate = useNavigate()

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const { data: { user } } = await supabase.auth.getUser()
    const { error } = await supabase.from('trips').insert([
      { ...form, user_id: user.id }
    ])
    if (error) alert(error.message)
    else navigate('/my-trips')
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow p-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-blue-500">Traveloop</h1>
        <button onClick={() => navigate('/dashboard')}
          className="text-blue-500">Back</button>
      </nav>
      <div className="p-6 max-w-lg mx-auto">
        <h2 className="text-xl font-semibold mb-4">Plan a New Trip</h2>
        <div className="bg-white rounded-lg shadow p-6">
          <form onSubmit={handleSubmit}>
            <input name="trip_name" placeholder="Trip Name"
              className="w-full border p-2 rounded mb-4" onChange={handleChange} />
            <input name="place" placeholder="Select a Place"
              className="w-full border p-2 rounded mb-4" onChange={handleChange} />
            <input name="start_date" type="date" placeholder="Start Date"
              className="w-full border p-2 rounded mb-4" onChange={handleChange} />
            <input name="end_date" type="date" placeholder="End Date"
              className="w-full border p-2 rounded mb-4" onChange={handleChange} />
            <textarea name="description" placeholder="Trip Description"
              className="w-full border p-2 rounded mb-4 h-24" onChange={handleChange} />
            <button type="submit"
              className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
              Save Trip
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default CreateTrip