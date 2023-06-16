import { createClient } from '@supabase/supabase-js'

const loginURL = "https://elpamaunawmrqotxzfkt.supabase.co";
const loginAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVscGFtYXVuYXdtcnFvdHh6Zmt0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODQ2MDA4MjYsImV4cCI6MjAwMDE3NjgyNn0.EPJ-RxF593gV9fTsLBDYyoAH_o8DAXxnIBYPFdX_7to";

const supabase = createClient(loginURL, loginAnonKey)

export {
  supabase
}