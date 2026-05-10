import React, { useEffect, useState } from 'react'
import Card from '../components/Card'
import Button from '../components/Button'
import { MapPin, Calendar, DollarSign, Edit2, Trash2 } from 'lucide-react'
import { supabase } from '../supabaseClient'

interface Trip {
  id: string
  name: string
  destination: string
  date: string
  budget: number
  status: 'upcoming' | 'ongoing' | 'completed'
}

interface TripRow {
  id?: number | string
  name?: string
  trip_name?: string | null
  destination?: string
  place?: string | null
  date?: string
  start_date?: string | null
  end_date?: string | null
  budget?: number | string | null
  status?: 'upcoming' | 'ongoing' | 'completed' | null
}

const toNumber = (value: number | string | null | undefined) => {
  const parsed = Number(value)
  return Number.isFinite(parsed) ? parsed : 0
}

const mapTripRow = (row: TripRow, index: number): Trip => ({
  id: String(row.id || index + 1),
  name: row.trip_name || row.name || 'Untitled Trip',
  destination: row.place || row.destination || 'Destination pending',
  date:
    row.date ||
    [row.start_date, row.end_date].filter(Boolean).join(' - ') ||
    'Dates pending',
  budget: toNumber(row.budget),
  status: row.status || 'upcoming',
})

const Trips: React.FC = () => {
  const [trips, setTrips] = useState<Trip[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isCreating, setIsCreating] = useState(false)

  const statusColors = {
    upcoming: 'bg-accent text-primary',
    ongoing: 'bg-muted text-white',
    completed: 'bg-light text-primary',
  }

  const fetchTrips = async () => {
    console.log('Fetching trips...')
    setIsLoading(true)

    try {
      const { data, error } = await supabase.from('trips').select('*')

      console.log('Trips data:', data)
      console.error('Trips error:', error)

      if (error) {
        console.error('Error fetching trips from trips table:', error)
        return
      }

      const nextTrips = (data || []).map((trip, index) => mapTripRow(trip, index))
      setTrips(nextTrips)
      console.log('Trips state updated:', nextTrips)
    } catch (error) {
      console.error('Unexpected error while fetching trips:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleCreateTrip = async () => {
    setIsCreating(true)

    try {
      const { data, error } = await supabase
        .from('trips')
        .insert([
          {
            trip_name: 'Demo Trip',
            place: 'Test City',
          },
        ])
        .select()

      console.log('Insert result:', data, error)

      if (error) {
        console.error('Error inserting trip:', error)
        alert('Could not save trip')
        return
      }

      if (data && data.length > 0) {
        setTrips((currentTrips) => {
          const insertedTrips = data.map((trip, index) =>
            mapTripRow(trip, currentTrips.length + index)
          )
          const nextTrips = [...currentTrips, ...insertedTrips]
          console.log('Trips state after insert:', nextTrips)
          return nextTrips
        })
      } else {
        await fetchTrips()
      }

      alert('Trip created successfully!')
    } catch (error) {
      console.error('Unexpected error inserting trip:', error)
      alert('Could not save trip')
    } finally {
      setIsCreating(false)
    }
  }

  useEffect(() => {
    void fetchTrips()
  }, [])

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-primary dark:text-white">My Trips</h1>
        <Button onClick={handleCreateTrip} disabled={isCreating}>
          {isCreating ? 'Saving...' : '+ New Trip'}
        </Button>
      </div>

      {/* Trips List */}
      <div className="space-y-4">
        {isLoading ? (
          <Card className="text-center py-12">
            <div className="animate-pulse text-gray-400">Loading trips...</div>
          </Card>
        ) : (
          trips.map((trip) => (
            <Card
              key={trip.id}
              className="hover:scale-102 transition-transform"
            >
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <h3 className="text-xl font-bold text-primary dark:text-white">
                      {trip.name}
                    </h3>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold capitalize ${
                        statusColors[trip.status]
                      }`}
                    >
                      {trip.status}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                      <MapPin size={18} />
                      <span>{trip.destination}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                      <Calendar size={18} />
                      <span>{trip.date}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                      <DollarSign size={18} />
                      <span>Budget: ${trip.budget}</span>
                    </div>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-secondary transition-colors">
                      <span onClick={() => alert("Edit feature coming soon!")}> 
                       <Edit2 size={18} className="text-primary dark:text-accent" />
                      </span>
                  </button>
                  <button className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-secondary transition-colors" onClick={() => alert('Delete feature coming soon!')}>
                    <Trash2 size={18} className="text-red-500" />
                  </button>
                </div>
              </div>
            </Card>
          ))
        )}
      </div>

      {/* Empty State */}
      {!isLoading && trips.length === 0 && (
        <Card className="text-center py-12">
          <p className="text-gray-500 dark:text-gray-400 mb-4">No trips yet</p>
          <Button onClick={handleCreateTrip} disabled={isCreating}>
            Create Your First Trip
          </Button>
        </Card>
      )}
    </div>
  )
}

export default Trips
