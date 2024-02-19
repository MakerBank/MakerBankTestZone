import { createClient } from '@supabase/supabase-js'

const loginURL = "https://jkycrttpcaxqqpqftmau.supabase.co";
const loginAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpreWNydHRwY2F4cXFwcWZ0bWF1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzQ1MDA2MzgsImV4cCI6MTk5MDA3NjYzOH0.Btz0uJdAKdRd1iaj31kBLzsHcgpTJeq_rK_6ETELenE";

const supabase = createClient(loginURL, loginAnonKey)

export {
  supabase
}