"use client";
import { useRouter } from "next/navigation";
import { twMerge } from "tailwind-merge";
import { HiHome } from "react-icons/hi";
// import { RxCaretLeft, RxCaretRight } from "react-icons/rx";
import { BiSearch } from "react-icons/bi";
import Button from "./Button";
import useAuthModal from "@/hooks/useAuthModal";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useUser } from "@/hooks/useUser";
import { FaUserAlt } from "react-icons/fa";
import toast from "react-hot-toast/headless";
import { ArrowLeftIcon,ArrowRightIcon } from "@chakra-ui/icons";
interface HeaderProps {
  children: React.ReactNode;
  className?: string;
}
export const Header: React.FC<HeaderProps> = ({ children, className }) => {
  const AuthModal = useAuthModal();
  const router = useRouter();

  const supabaseClient = useSupabaseClient();
  const { user, subscription } = useUser();
  const handleLogout = async () => {
    const { error } = await supabaseClient.auth.signOut();
    //TODO: Reset any playing songs
    router.refresh();
    if (error) {
      toast.error(error.message);
    }
    else{
      toast.success('Logged Out');
    }
  };
  return (
    <div
      className={twMerge(
          `h-fit  p-6`,
        className
      )}
    >
      <div className="w-full mb-4 flex items-center justify-between">
        <div className="hidden md:flex gap-x-4 items-center">
          <button
            onClick={() => router.back()}
            className="rounded-full bg-[#5C6B73]/20 flex items-center justify-center hover:opacity-75 hover:bg-[#5C6B73] transition"
          >
            <ArrowLeftIcon className="text-white" />
          </button>
          <button
            onClick={() => router.forward()}
          className="rounded-full bg-[#5C6B73]/20 flex items-center justify-center hover:opacity-75 hover:bg-[#5C6B73] transition"
          >
            <ArrowRightIcon className="text-white"/>
          </button>
        </div>
        <div className="flex md:hidden gap-x-2 items-center">
          <button className="rounded-full p-2 bg-[#E0FBFC] flex items-center justify-center hover:opacity-75 transition">
            <HiHome className="text-black" size={20} />
          </button>
          <button className="rounded-full p-2 bg-[#E0FBFC] flex items-center justify-center hover:opacity-75 transition">
            <BiSearch className="text-black" size={20} />
          </button>
        </div>
        <div className="flex justify-between items-center gap-x-4">
          {user ? (
            <div className="flex gap-x-4 items-center">
            <Button className="bg-[#E0FBFC] px-6 py-2" onClick={handleLogout}>
                LogOut
              </Button>
              <Button
                onClick={() => router.push("/account")}
                className="bg-[#E0FBFC]"
              >
                <FaUserAlt />
              </Button>
            </div>
          ) : (
            <>
              <div>
                <Button
                  onClick={AuthModal.onOpen}
                className="bg-transparent text-[#E0FBFC] font-medium"
                >
                  Sign Up
                </Button>
              </div>
              <div>
                <Button
                  onClick={AuthModal.onOpen}
                  className="bg-[#E0FBFC] px-6 py-2"
                >
                  Log in
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
      {children}
    </div>
  );
};
