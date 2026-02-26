import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://zudrndijhdcdbtduvtsr.supabase.co'
const supabaseKey = 'sb_publishable_rAIdjziNg-cCYSrUGfI6iw_yxx5VcSc'

export const supabase = createClient(supabaseUrl, supabaseKey)