import { createClient } from '@supabase/supabase-js'

const supabaseURL = import.meta.env.VITE_SUPABASEURL
const supabaseKey = import.meta.env.VITE_SUPABASEKEY

const supabase = createClient(supabaseURL, supabaseKey)

export default supabase
