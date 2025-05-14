"use client"

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { Database } from '@/types/supabase'

let supabaseClient: ReturnType<typeof createClientComponentClient<Database>> | null = null

export const getSupabase = () => {
  if (typeof window === 'undefined' || process.env.NODE_ENV === 'production') {
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
      return null
    }
  }
  
  if (!supabaseClient) {
    supabaseClient = createClientComponentClient<Database>()
  }
  return supabaseClient
}

export const supabase = getSupabase() 