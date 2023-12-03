import { Lib } from "@/types";
import { useSupabaseClient } from "@supabase/auth-helpers-react";

export const  useLibImage =  (lib: Lib)=>{
    const supabaseClient = useSupabaseClient();
    if(!lib){
        return null;
    }
    const { data:imageData } = supabaseClient.storage.from('images').getPublicUrl(lib.image_path);
    return imageData.publicUrl;
};