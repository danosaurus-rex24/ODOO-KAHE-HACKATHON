import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../supabaseClient'

function MyTrips() {
  const [trips, setTrips] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    fetchTrips()
  }, [])

  const fetchTrips = async () => {
    const { data: { user } } = await supabase.auth.getUser()
    const { data, error } = await supabase
      .from('trips')
      .select('*')
      .eq('user_id', user.id)
    if (error) alert(error.message)
    else setTrips(data)
  }

  const deleteTrip = async (id) => {
    await supabase.from('trips').delete().eq('id', id)
    fetchTrips()
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow p-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-blue-500">Traveloop</h1>
        <button onClick={() => navigate('/dashboard')}
          className="text-blue-500">Back</button>
      </nav>
      <div className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">My Trips</h2>
          <button onClick={() => navigate('/create-trip')}
            className="bg-blue-500 text-white px-4 py-2 rounded">
            + New Trip
          </button>
        </div>
        {trips.length === 0 ? (
          <p className="text-gray-500 text-center mt-10">No trips yet. Plan one!</p>
        ) : (
          trips.map(trip => (
            <div key={trip.id}
              className="bg-white rounded-lg shadow p-4 mb-4">
              <h3 className="text-lg font-semibold">{trip.trip_name}</h3>
              <p className="text-gray-500">{trip.place}</p>
              <p className="text-sm text-gray-400">{trip.start_date} → {trip.end_date}</p>
              <p className="text-sm mt-2">{trip.description}</p>
              <div className="flex gap-2 mt-3">
                <button className="bg-blue-100 text-blue-500 px-3 py-1 rounded text-sm">
                  View
                </button>
                <button onClick={() => deleteTrip(trip.id)}
                  className="bg-red-100 text-red-500 px-3 py-1 rounded text-sm">
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default MyTrips