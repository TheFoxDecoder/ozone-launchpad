
import { supabase } from "@/integrations/supabase/client";

// Bypass the empty Database types safely for now.
// When src/integrations/supabase/types.ts is populated, we can remove this.
export const sb = supabase as any;
