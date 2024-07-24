import { Lib } from "@/types";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
export const getLibById = async (id:string): Promise<Lib> => {
  const supabase = createServerComponentClient({
    cookies: cookies,
  });
  const { data, error } = await supabase
    .from("libraries")
    .select("*")
    .eq('library_id',id)
    .single();
  if (error) {
    console.log(error);
  }
  return (data as any) || null;
};
