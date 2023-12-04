"use client";

import LibItem from "@/components/LibItem";
import SongItem from "@/components/SongItem";
import { Lib } from "@/types";

interface PageContentProps{
    libs: Lib[];
}
const LibContent: React.FC<PageContentProps> = ({
    libs
}) => {
    if(libs.length===0){
        return (
            <div className="mt-4 text-[#E0FBFC]">No Songs availabe.</div>
        )
    }
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-8 gap-4 mt-4">
        {libs.slice(0,8).map((item)=>(
            <LibItem key ={item.library_id} data={item} />
        ))}
    </div>
  )
}

export default LibContent