import React from 'react'
import { Calendar, DollarSign, MapIcon, MapPin, TrendingUp } from 'lucide-react'
import Button from '../components/Button'
import Card from '../components/Card'

interface Trip {
  id: number
  name: string
  destination: string
  date: string
  budget: number
  spent: number
  image: string
}

const Dashboard: React.FC = () => {
  console.log('Dashboard rendering')

  const trips: Trip[] = [
    {
      id: 1,
      name: 'Tokyo Adventure',
      destination: 'Tokyo, Japan',
      date: 'May 20 - June 5',
      budget: 3000,
      spent: 1850,
      image: '🗻',
    },
    {
      id: 2,
      name: 'European Tour',
      destination: 'Paris, France',
      date: 'July 10 - July 25',
      budget: 4500,
      spent: 2100,
      image: '🗼',
    },
    {
      id: 3,
      name: 'Beach Getaway',
      destination: 'Bali, Indonesia',
      date: 'August 1 - August 15',
      budget: 2500,
      spent: 500,
      image: '🏝️',
    },
  ]

  const totalBudget = trips.reduce((sum, trip) => sum + trip.budget, 0)
  const totalSpent = trips.reduce((sum, trip) => sum + trip.spent, 0)
  const remainingBudget = totalBudget - totalSpent

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
            onClick={() => alert('Trip created successfully!')}
          >
            Create Trip
          </Button>
        </Card>
      </div>

      <section className="space-y-4">
        <h3 className="text-2xl font-bold text-primary dark:text-white">Your Trips</h3>

        {trips.length === 0 ? (
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
                        {Math.round((trip.spent / trip.budget) * 100)}%
                      </span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-light dark:bg-secondary">
                      <div
                        className="h-2 rounded-full bg-accent transition-all duration-500"
                        style={{
                          width: `${(trip.spent / trip.budget) * 100}%`,
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
            <p className="mt-1 text-lg font-semibold">
              {Math.round((remainingBudget / totalBudget) * 100)}% left
            </p>
          </div>
        </div>
      </Card>
    </div>
  )
}

export default Dashboard
