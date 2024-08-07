"use client";

import { useLibImage } from "@/hooks/useLibImage";
import { Lib } from "@/types";
import Image from "next/image";
import PlayButton from "./PlayButton";
import { useRouter } from "next/navigation";

interface SongItemProps {
  data: Lib;
}
const LibItem: React.FC<SongItemProps> = ({ data}) => {
  const router = useRouter();
  const imagePath = useLibImage(data);
  return (
    <div onClick={()=>router.push(`/library/${data.library_id}`)}
      className="
      relative
      group
      flex
      flex-col
      items-center
      justify-center
      rounded-md
      overflow-hidden
      gap-x-4
    bg-neutral-400/5 
      cursor-pointer 
      hover:bg-slate-400/10 
      transition 
      p-3
      "
    >
      <div className="relative aspect-square w-full h-full rounded-md overflow-hidden">
        <Image
          className="object-cover"
          src={imagePath || "/images/liked.png"}
          fill
          alt="Image"
        />
      </div>
      <div className="flex flex-col items-start w-full pt-4 gap-y-1">
        <p className="font-semibold truncate w-full">{data.title}</p>
      </div>
    </div>
  );
};

export default LibItem;
