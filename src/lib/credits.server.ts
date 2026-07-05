import type { SupabaseClient } from "@supabase/supabase-js";

const DEFAULT_AI_CREDITS = 5;

export async function consumeAiCredit(supabase: SupabaseClient, userId: string): Promise<number> {
  // TODO: Re-enable premium gate before production launch
  void supabase;
  void userId;
  void DEFAULT_AI_CREDITS;
  return 999;
}
