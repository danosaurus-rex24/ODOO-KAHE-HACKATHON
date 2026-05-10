import { useNavigate } from 'react-router-dom'

function Dashboard() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow p-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-blue-500">Traveloop</h1>
        <button onClick={() => navigate('/')}
          className="text-red-500">Logout</button>
      </nav>
      <div className="p-6">
        <h2 className="text-xl font-semibold mb-4">Welcome back!</h2>
        <div className="bg-blue-500 text-white rounded-lg p-6 mb-6">
          <h3 className="text-2xl font-bold">Plan Your Next Adventure</h3>
          <p className="mt-2">Create and manage your trips easily</p>
          <button onClick={() => navigate('/create-trip')}
            className="mt-4 bg-white text-blue-500 px-4 py-2 rounded font-semibold">
            Plan a Trip
          </button>
        </div>
        <h3 className="text-lg font-semibold mb-3">Previous Trips</h3>
        <button onClick={() => navigate('/my-trips')}
          className="w-full bg-white border p-4 rounded-lg text-left shadow hover:shadow-md">
          View All My Trips →
        </button>
      </div>
    </div>
  )
}

export default Dashboard