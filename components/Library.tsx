"use client";
import { useRouter } from "next/navigation";
import { TbPlaylist } from "react-icons/tb";
import { IoLibrary } from "react-icons/io5";
import { AiOutlinePlus } from "react-icons/ai";
import useAuthModal from "@/hooks/useAuthModal";
import { useUser } from "@/hooks/useUser";
import useUploadModal from "@/hooks/useUploadModal";
import useLibraryModal from "@/hooks/useLibraryModal";
import { Song } from "@/types";
import {Lib} from "@/types";
import MediaItem from "./MediaItem";
import useOnPlay from "@/hooks/useOnPlay";
import useSubscribeModal from "@/hooks/useSubscribeModal";
import LibItem from "./LibItem";

interface LibraryProps {
  songs: Song[];
  libraries: Lib[];
}
const Library: React.FC<LibraryProps> = ({ songs,libraries }) => {
  const SubsribeModal = useSubscribeModal();
  const authModal = useAuthModal();
  const router = useRouter();
  const uploadModal = useUploadModal();
  const libraryModal = useLibraryModal();
  const { user, subscription } = useUser();
  const onPlay = useOnPlay(songs);
  const onClick = () => {
    if (!user) {
      return authModal.onOpen();
    }
    // if(!subscription){
    //   return SubsribeModal.onOpen();
    // }
    return uploadModal.onOpen();
  };
  const libClick = () =>{
    if(!user){
      return authModal.onOpen();
    }
    return libraryModal.onOpen();
  }
  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between px-5 pt-4">
        <div className="inline-flex items-center gap-x-2">
          <TbPlaylist className=" text-neutral-400" size={26} />
          <p className="text-neutral-400 font-medium text-md">Your Songs</p>
        </div>
        <AiOutlinePlus
          onClick={onClick}
          size={20}
          className="text-neutral-400 cursor-pointer hover:text-white transition"
        />
      </div>
      {user ? (
      <>
      <div className="flex flex-col gap-y-2 mt-4 px-3">
        {songs.slice(0, 3).map((item) => (
          <MediaItem
            onClick={(id: string) => onPlay(id)}
            key={item.id}
            data={item}
          />
        ))}
      </div>
      
        <button
          onClick={() => router.push("/songs")}
          className="ml-auto text-neutral-400 cursor-pointer hover:text-[#E0FBFC] transition mr-5"
        >
          <span>See More</span>
        </button>
        </>
      ) : (
        <span className="ml-10 text-neutral-300 ">No Songs Added</span>
      )}
      <div className="flex items-center justify-between px-5 pt-4">
        <div className="inline-flex items-center gap-x-2">
          <IoLibrary className="text-neutral-400" size={26} />
          <p className="text-neutral-400 font-medium text-md">Your Library</p>
        </div>
        <AiOutlinePlus
          onClick={libClick}
          size={20}
          className="text-neutral-400 cursor-pointer hover:text-white transition"
        />
      </div>
      <div className="flex flex-col gap-y-2 mt-4 px-3">
        {libraries.slice(0, 3).map((item) => (
          <LibItem
            key={item.library_id}
            data={item}
          />
        ))}
      </div>
    </div>
  );
};

export default Library;
