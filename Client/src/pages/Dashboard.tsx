import React, { useEffect, useState } from 'react'
import { Calendar, DollarSign, MapIcon, MapPin, TrendingUp } from 'lucide-react'
import Button from '../components/Button'
import Card from '../components/Card'
import { supabase } from '../supabaseClient'

interface Trip {
  id: string
  name: string
  destination: string
  date: string
  budget: number
  spent: number
  image: string
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
  spent?: number | string | null
  image?: string | null
}

const mockTrips: Trip[] = [
  {
    id: '1',
    name: 'Tokyo Adventure',
    destination: 'Tokyo, Japan',
    date: 'May 20 - June 5',
    budget: 3000,
    spent: 1850,
    image: '🗻',
  },
  {
    id: '2',
    name: 'European Tour',
    destination: 'Paris, France',
    date: 'July 10 - July 25',
    budget: 4500,
    spent: 2100,
    image: '🗼',
  },
  {
    id: '3',
    name: 'Beach Getaway',
    destination: 'Bali, Indonesia',
    date: 'August 1 - August 15',
    budget: 2500,
    spent: 500,
    image: '🏝️',
  },
]

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
  spent: toNumber(row.spent),
  image: row.image || '✈️',
})

const Dashboard: React.FC = () => {
  console.log('Dashboard rendering')

  const [trips, setTrips] = useState<Trip[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isCreating, setIsCreating] = useState(false)

  const fetchTrips = async () => {
    console.log('Fetching trips...')
    setIsLoading(true)

    try {
      const { data, error } = await supabase.from('trips').select('*')

      console.log('Trips data:', data)
      console.error('Trips error:', error)

      if (error) {
        console.error('Error fetching trips from trips table:', error)
        setTrips(mockTrips)
        return
      }

      const nextTrips = (data || []).map((trip, index) => mapTripRow(trip, index))
      setTrips(nextTrips)
      console.log('Trips state updated:', nextTrips)
    } catch (error) {
      console.error('Unexpected error while fetching trips:', error)
      setTrips(mockTrips)
    } finally {
      setIsLoading(false)
    }
  }

  const handleCreateTrip = async () => {
    setIsCreating(true)

    try {
      const newTrip = {
        trip_name: 'Demo Trip',
        place: 'Test City',
      }

      const { data, error } = await supabase
        .from('trips')
        .insert([newTrip])
        .select()

      console.log('Insert result:', data, error)

      if (error) {
        console.error('Failed to create trip:', error)
        alert('Could not create trip. Please try again.')
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
      console.error('Unexpected error while creating trip:', error)
      alert('Could not create trip. Please try again.')
    } finally {
      setIsCreating(false)
    }
  }

  useEffect(() => {
    void fetchTrips()
  }, [])

  const totalBudget = trips.reduce((sum, trip) => sum + trip.budget, 0)
  const totalSpent = trips.reduce((sum, trip) => sum + trip.spent, 0)
  const remainingBudget = totalBudget - totalSpent
  const remainingPercent =
    totalBudget > 0 ? Math.round((remainingBudget / totalBudget) * 100) : 0

  return (
    <div className="space-y-6">
      <Card className="bg-gradient-to-r from-primary to-secondary text-white hover:shadow-2xl">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="mb-2 text-3xl font-bold">Welcome back, Shivashylee ✈️</h2>
            <p className="text-gray-100">Ready for your next adventure?</p>
          </div>
          <span className="text-5xl">✈️</span>
        </div>
      </Card>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-5">
        <Card>
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Active Trips</p>
              <p className="text-3xl font-bold text-primary dark:text-accent">{trips.length}</p>
            </div>
            <MapIcon className="text-accent opacity-20" size={40} />
          </div>
        </Card>

        <Card>
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Total Budget</p>
              <p className="text-3xl font-bold text-primary dark:text-accent">${totalBudget}</p>
            </div>
            <DollarSign className="text-accent opacity-20" size={40} />
          </div>
        </Card>

        <Card>
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Amount Spent</p>
              <p className="text-3xl font-bold text-primary dark:text-accent">${totalSpent}</p>
            </div>
            <TrendingUp className="text-accent opacity-20" size={40} />
          </div>
        </Card>

        <Card>
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Remaining</p>
              <p className="text-3xl font-bold text-primary dark:text-accent">${remainingBudget}</p>
            </div>
            <DollarSign className="text-accent opacity-20" size={40} />
          </div>
        </Card>

        <Card className="flex items-center justify-center">
          <Button
            className="transition hover:opacity-90"
            onClick={handleCreateTrip}
          >
            {isCreating ? 'Creating...' : 'Create Trip'}
          </Button>
        </Card>
      </div>

      <section className="space-y-4">
        <h3 className="text-2xl font-bold text-primary dark:text-white">Your Trips</h3>

        {isLoading ? (
          <Card className="flex min-h-48 items-center justify-center text-center">
            <div className="animate-pulse text-gray-400 text-lg font-semibold">
              Loading trips...
            </div>
          </Card>
        ) : trips.length === 0 ? (
          <Card className="flex min-h-48 items-center justify-center text-center">
            <p className="text-lg font-semibold text-primary dark:text-white">
              No trips yet. Start planning your journey ✈️
            </p>
          </Card>
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {trips.map((trip) => (
              <Card
                key={trip.id}
                className="cursor-pointer overflow-hidden rounded-xl shadow-lg transition duration-300 hover:scale-105"
              >
                <div className="mb-4">
                  <div className="mb-3 text-5xl">{trip.image}</div>
                  <h4 className="text-xl font-bold text-primary dark:text-white">
                    {trip.name}
                  </h4>
                  <p className="mt-2 flex items-center gap-2 text-gray-600 dark:text-gray-300">
                    <MapPin size={16} />
                    {trip.destination}
                  </p>
                </div>

                <div className="space-y-3 border-t border-light pt-4 dark:border-primary">
                  <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                    <Calendar size={16} />
                    <span className="text-sm">{trip.date}</span>
                  </div>

                  <div>
                    <div className="mb-2 flex items-center justify-between">
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        Budget Usage
                      </span>
                      <span className="text-sm font-semibold text-accent">
                        {trip.budget > 0 ? Math.round((trip.spent / trip.budget) * 100) : 0}%
                      </span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-light dark:bg-secondary">
                      <div
                        className="h-2 rounded-full bg-accent transition-all duration-500"
                        style={{
                          width: `${trip.budget > 0 ? (trip.spent / trip.budget) * 100 : 0}%`,
                        }}
                      />
                    </div>
                    <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                      ${trip.spent} of ${trip.budget} spent
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </section>

      <Card className="bg-gradient-to-r from-accent to-muted text-primary">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="mb-1 text-sm opacity-80">Remaining Budget</p>
            <h3 className="text-3xl font-bold">${remainingBudget}</h3>
          </div>

          <div className="grid grid-cols-2 gap-4 md:text-right">
            <div>
              <p className="text-sm opacity-80">Total Budget</p>
              <p className="text-lg font-semibold">${totalBudget}</p>
            </div>
            <div>
              <p className="text-sm opacity-80">Spent Amount</p>
              <p className="text-lg font-semibold">${totalSpent}</p>
            </div>
          </div>

          <div className="md:text-right">
            <p className="text-sm opacity-80">of ${totalBudget} total</p>
            <p className="mt-1 text-lg font-semibold">{remainingPercent}% left</p>
          </div>
        </div>
      </Card>
    </div>
  )
}

export default Dashboard
