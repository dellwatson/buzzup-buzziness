import { createClient } from "https://cdn.skypack.dev/@supabase/supabase-js";
import { SUPABASE_URL, SUPABASE_ANON_KEY } from "./credentials.ts";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
