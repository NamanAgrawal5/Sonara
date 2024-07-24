"use client";
import Image from "next/image";
import {Lib} from "@/types";
import { useLibImage } from "@/hooks/useLibImage";
interface ImageLibprops{
    lib: Lib
}
const  ImageLib:React.FC<ImageLibprops> = ({
 lib
}) => {
  const imagePath = useLibImage(lib);
  return (
    <div className="relative h-16 w-16 lg:h-60 lg:w-64 object-cover">
      <Image
        fill
        src={imagePath ||"/images/liked.png"}
        alt="PlayList"
        className="object-contain"
      />
    </div>
  );
}
export default ImageLib