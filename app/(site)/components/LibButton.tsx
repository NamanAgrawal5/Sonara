"use client";
import { AiOutlineArrowsAlt } from "react-icons/ai"
import { useRouter } from "next/navigation"
function LibButton() {
  const router = useRouter();
  return (
    <div className="flex flex-row justify-between items-center mr-5">
            <span className="text-neutral-500 mr-2">All Library</span>
            <AiOutlineArrowsAlt
              onClick={()=>router.push("/library")}
              size={30}
              className="text-neutral-400 cursor-pointer hover:text-white transition"
            />
    </div>
  )
}

export default LibButton