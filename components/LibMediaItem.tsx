"use client";

import { useLibImage } from "@/hooks/useLibImage";
import usePlayer from "@/hooks/usePlayer";
import { Lib } from "@/types";
import Image from "next/image";

interface MediaItemProps{
    data: Lib;
}
const LibMediaItem: React.FC<MediaItemProps> = ({
    data,
}) => {
  const imageUrl = useLibImage(data);
  return (
    <div 
    className="flex
    items-center
    gap-x-3
    cursor-pointer
    hover:bg-neutral-800/50
    w-full
    p-2
    rounded-md"
    >
        <div className="
        relative
        rounded-md
        min-h-[48px]
        min-w-[48px]
        overflow-hidden">
            <Image
             fill
             src={imageUrl || '/images/liked.png'}
             alt="Media Item"
             className="object-cover"
            />
        </div>
        <div>
          <div className="flex flex-col gap-y-1 overflow-hidden">
            <p className="text-white truncate">
                {data.title}
            </p>
            </div>  
        </div>
    </div>
  )
}

export default LibMediaItem