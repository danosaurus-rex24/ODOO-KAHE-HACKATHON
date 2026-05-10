import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://jvwbjeuvisjjsvwthzmr.supabase.co'
const supabaseKey = 'sb_publishable_AmXe9xu7AYBts1ds91Y4yg_gGyTW-BL'

console.log('Supabase config loaded:', {
  url: supabaseUrl,
  hasAnonKey: Boolean(supabaseKey),
})

export const supabase = createClient(supabaseUrl, supabaseKey)

supabase
  .from('trips')
  .select('*')
  .limit(1)
  .then(({ data, error }) => {
    console.log('Supabase connection test:', data, error)
    if (error) {
      console.error('Supabase connection test error:', error)
    }
  })
