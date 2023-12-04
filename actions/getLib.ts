import { Lib } from "@/types";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
export const getLib = async (): Promise<Lib[]> => {
  const supabase = createServerComponentClient({
    cookies: cookies,
  });
  const { data, error } = await supabase
    .from("libraries")
    .select("*")
    .order("created_at", {
      ascending: false,
    });
  if (error) {
    console.log(error);
  }
  return (data as any) || [];
};
