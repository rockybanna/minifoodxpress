// Supabase Global Client

import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const SUPABASE_URL = "https://uouwizrknwrqqynodplv.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVvdXdpenJrbndycXF5bm9kcGx2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzMwNDk1MjksImV4cCI6MjA4ODYyNTUyOX0.oxDZqaT1bMed6uuirN2ZoDCambPYLhOHp2PlhX8gaco";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
