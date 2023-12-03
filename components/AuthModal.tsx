"use client";
import {
  useSupabaseClient,
  useSessionContext,
} from "@supabase/auth-helpers-react";
import { Modal } from "./Modal";
import { useRouter } from "next/navigation";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import useAuthModal from "@/hooks/useAuthModal";
import { useEffect } from "react";
const AuthModal = () => {
  const supabaseClient = useSupabaseClient();
  const router = useRouter();
  const { session } = useSessionContext();
  const {onClose,isOpen} = useAuthModal();
  useEffect(()=>{
    if(session){
        router.refresh();
        onClose();
    }
  },[session,router,onClose]);
  const onChange=(open:boolean)=>{
    if(!open){
        onClose();    
    }
  }
  return (
    <div>
      <Modal
        title="Welcome back"
        description="Login to your Account"
        isOpen={isOpen}
        onChange={onChange}
      >
        <Auth theme="#000"
        magicLink
        providers={["google"]}
        supabaseClient={supabaseClient}
        appearance={{
            theme: ThemeSupa,
            variables: {
                default: {
                    colors:{
                        brand: '#5C6B73',
                        brandAccent: '#C2DFE3'
                    }
                }
            }
        }}
        />
      </Modal>
    </div>
  );
};

export default AuthModal;
