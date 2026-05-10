import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import CreateTrip from './pages/CreateTrip'
import MyTrips from './pages/MyTrips'
import Itinerary from './pages/Itinerary'
import PackingList from './pages/PackingList'
import TripNotes from './pages/TripNotes'
import Expenses from './pages/Expenses'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/itinerary" element={<Itinerary />} />
        <Route path="/packing-list" element={<PackingList />} />
        <Route path="/trip-notes" element={<TripNotes />} />
        <Route path="/expenses" element={<Expenses />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/create-trip" element={<CreateTrip />} />
        <Route path="/my-trips" element={<MyTrips />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App