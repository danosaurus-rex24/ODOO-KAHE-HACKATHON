import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://jvwbjeuvisjjsvwthzmr.supabase.co'
const supabaseKey = 'sb_publishable_AmXe9xu7AYBts1ds91Y4yg_gGyTW-BL'

export const supabase = createClient(supabaseUrl, supabaseKey)