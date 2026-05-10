import React from 'react'
import { MapPin, Calendar, DollarSign, TrendingUp, MapIcon } from 'lucide-react'
import Card from '../components/Card'
import Button from '../components/Button'

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

  return (
    <div className="space-y-6">
      <div className="bg-red-500 text-white p-4">
        DASHBOARD WORKING
      </div>

      <div className="rounded bg-blue-600 p-4 font-bold text-white shadow">
        Tailwind styles are applied
      </div>

      {/* Welcome Section */}
      <Card className="bg-gradient-to-r from-primary to-secondary text-white hover:shadow-2xl">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-3xl font-bold mb-2">Welcome back, Traveler</h2>
            <p className="text-gray-100">Ready for your next adventure?</p>
          </div>
          <span className="text-5xl">✈️</span>
        </div>
      </Card>

      {/* Stats and Create Trip */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 dark:text-gray-400 text-sm">Active Trips</p>
              <p className="text-3xl font-bold text-primary dark:text-accent">{trips.length}</p>
            </div>
            <MapIcon className="text-accent text-3xl opacity-20" size={40} />
          </div>
        </Card>

        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 dark:text-gray-400 text-sm">Total Budget</p>
              <p className="text-3xl font-bold text-primary dark:text-accent">${totalBudget}</p>
            </div>
            <DollarSign className="text-accent text-3xl opacity-20" size={40} />
          </div>
        </Card>

        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 dark:text-gray-400 text-sm">Amount Spent</p>
              <p className="text-3xl font-bold text-primary dark:text-accent">${totalSpent}</p>
            </div>
            <TrendingUp className="text-accent text-3xl opacity-20" size={40} />
          </div>
        </Card>

        <Card className="flex items-center justify-center">
          <Button onClick={() => console.log('Create new trip')}>
            Create Trip
          </Button>
        </Card>
      </div>

      {/* Trips Section */}
      <div>
        <h3 className="text-2xl font-bold text-primary dark:text-white mb-4">Your Trips</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {trips.map((trip) => (
            <Card
              key={trip.id}
              className="hover:scale-105 cursor-pointer overflow-hidden"
            >
              <div className="mb-4">
                <div className="text-5xl mb-3">{trip.image}</div>
                <h4 className="text-xl font-bold text-primary dark:text-white">
                  {trip.name}
                </h4>
                <p className="text-gray-600 dark:text-gray-300 flex items-center gap-2 mt-2">
                  <MapPin size={16} />
                  {trip.destination}
                </p>
              </div>

              <div className="border-t border-light dark:border-primary pt-4 space-y-2">
                <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                  <Calendar size={16} />
                  <span className="text-sm">{trip.date}</span>
                </div>

                {/* Budget Progress */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      Budget Usage
                    </span>
                    <span className="text-sm font-semibold text-accent">
                      {Math.round((trip.spent / trip.budget) * 100)}%
                    </span>
                  </div>
                  <div className="w-full bg-light dark:bg-secondary rounded-full h-2">
                    <div
                      className="bg-accent h-2 rounded-full transition-all duration-300"
                      style={{
                        width: `${(trip.spent / trip.budget) * 100}%`,
                      }}
                    />
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                    ${trip.spent} of ${trip.budget} spent
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Budget Summary */}
      <Card className="bg-gradient-to-r from-accent to-muted text-primary">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-sm opacity-80 mb-1">Remaining Budget</p>
            <h3 className="text-3xl font-bold">${totalBudget - totalSpent}</h3>
          </div>
          <div className="text-right">
            <p className="text-sm opacity-80">of ${totalBudget} total</p>
            <p className="text-lg font-semibold mt-1">
              {Math.round(((totalBudget - totalSpent) / totalBudget) * 100)}% left
            </p>
          </div>
        </div>
      </Card>
    </div>
  )
}

export default Dashboard
