import { useEffect, useState } from 'react'
import { supabase } from '../supabaseClient'
const TRIP_ID = 'trip_001'

export default function Itinerary() {
  const [items, setItems] = useState([])
  const [form, setForm] = useState({ day: 1, time: '', activity: '', location: '' })
  const [loading, setLoading] = useState(true)

  useEffect(() => { fetchItems() }, [])

  async function fetchItems() {
    setLoading(true)
    const { data } = await supabase
      .from('itinerary')
      .select('*')
      .eq('trip_id', TRIP_ID)
      .order('day', { ascending: true })
    setItems(data || [])
    setLoading(false)
  }

  async function addItem() {
    if (!form.activity.trim()) return
    await supabase.from('itinerary').insert({ ...form, trip_id: TRIP_ID })
    setForm({ day: 1, time: '', activity: '', location: '' })
    fetchItems()
  }

  async function deleteItem(id) {
    await supabase.from('itinerary').delete().eq('id', id)
    fetchItems()
  }

  const grouped = items.reduce((acc, item) => {
    acc[item.day] = acc[item.day] || []
    acc[item.day].push(item)
    return acc
  }, {})

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-primary dark:text-white">Itinerary Builder</h1>

      <div className="bg-white dark:bg-secondary rounded-xl shadow-lg p-6 space-y-4">
        <h2 className="text-lg font-semibold text-primary dark:text-white">Add Activity</h2>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-sm font-medium text-gray-600 dark:text-gray-400">Day</label>
            <input type="number" min="1" value={form.day}
              onChange={e => setForm({ ...form, day: parseInt(e.target.value) })}
              className="w-full mt-1 px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-accent"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-600 dark:text-gray-400">Time</label>
            <input type="time" value={form.time}
              onChange={e => setForm({ ...form, time: e.target.value })}
              className="w-full mt-1 px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-accent"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-600 dark:text-gray-400">Activity</label>
            <input type="text" placeholder="e.g. Visit Eiffel Tower" value={form.activity}
              onChange={e => setForm({ ...form, activity: e.target.value })}
              className="w-full mt-1 px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-accent"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-600 dark:text-gray-400">Location</label>
            <input type="text" placeholder="e.g. Paris, France" value={form.location}
              onChange={e => setForm({ ...form, location: e.target.value })}
              className="w-full mt-1 px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-accent"
            />
          </div>
        </div>
        <button onClick={addItem}
          className="px-6 py-2 bg-accent text-primary font-semibold rounded-lg hover:opacity-90 transition-all">
          + Add to Itinerary
        </button>
      </div>

      {loading ? <p className="text-gray-500">Loading...</p> : (
        Object.keys(grouped).sort((a, b) => a - b).map(day => (
          <div key={day} className="bg-white dark:bg-secondary rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-primary dark:text-accent mb-4">Day {day}</h2>
            <div className="space-y-3">
              {grouped[day].map(item => (
                <div key={item.id} className="flex items-center justify-between p-3 rounded-lg bg-gray-50 dark:bg-primary border border-gray-100 dark:border-gray-700">
                  <div>
                    <div className="flex items-center gap-3">
                      {item.time && <span className="text-xs font-mono bg-accent text-primary px-2 py-0.5 rounded">{item.time}</span>}
                      <span className="font-semibold text-gray-800 dark:text-white">{item.activity}</span>
                    </div>
                    {item.location && <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">📍 {item.location}</p>}
                  </div>
                  <button onClick={() => deleteItem(item.id)} className="text-red-400 hover:text-red-600 text-sm font-medium">Remove</button>
                </div>
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  )
}