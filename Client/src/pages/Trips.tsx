import React, { useState } from 'react'
import Card from '../components/Card'
import Button from '../components/Button'
import { MapPin, Calendar, DollarSign, Edit2, Trash2 } from 'lucide-react'

interface Trip {
  id: number
  name: string
  destination: string
  date: string
  budget: number
  status: 'upcoming' | 'ongoing' | 'completed'
}

const Trips: React.FC = () => {
  const [trips] = useState<Trip[]>([
    {
      id: 1,
      name: 'Tokyo Adventure',
      destination: 'Tokyo, Japan',
      date: 'May 20 - June 5',
      budget: 3000,
      status: 'upcoming',
    },
    {
      id: 2,
      name: 'European Tour',
      destination: 'Paris, France',
      date: 'July 10 - July 25',
      budget: 4500,
      status: 'upcoming',
    },
    {
      id: 3,
      name: 'Summer Getaway',
      destination: 'Maldives',
      date: 'August 1 - August 15',
      budget: 2500,
      status: 'completed',
    },
  ])

  const statusColors = {
    upcoming: 'bg-accent text-primary',
    ongoing: 'bg-muted text-white',
    completed: 'bg-light text-primary',
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-primary dark:text-white">My Trips</h1>
        <Button>+ New Trip</Button>
      </div>

      {/* Trips List */}
      <div className="space-y-4">
        {trips.map((trip) => (
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
                  <Edit2 size={18} className="text-primary dark:text-accent" />
                </button>
                <button className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-secondary transition-colors">
                  <Trash2 size={18} className="text-red-500" />
                </button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {trips.length === 0 && (
        <Card className="text-center py-12">
          <p className="text-gray-500 dark:text-gray-400 mb-4">No trips yet</p>
          <Button>Create Your First Trip</Button>
        </Card>
      )}
    </div>
  )
}

export default Trips