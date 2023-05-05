import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  "https://ogyelybkfudfsjarfonx.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9neWVseWJrZnVkZnNqYXJmb254Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzU3NTgyNTIsImV4cCI6MTk5MTMzNDI1Mn0._OdWSNG7J5bJuE-llxrDjAUG1undsckzxFGC-3pv12s",
);
