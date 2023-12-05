import { getLikedSongs } from "@/actions/getLikedSongs";
import { Header } from "@/components/Header";
import Image from "next/image";
import LikedContent from "./components/LikedContent";
import { getLibById } from "@/actions/getLibById";
import { useLibImage } from "@/hooks/useLibImage";
import {Lib} from '@/types';
export const revalidate = 0;
const Liked = async ({ params }: { params: { library_id: string } }) => {
  const libs = await getLibById(params.library_id);
  if(libs == null){
    return(
      <div className="text-center p-8 bg-gray-200">
      <h2 className="text-2xl font-bold mb-4 text-gray-600">No Library Found</h2>
      <p className="text-gray-600">Sorry, the requested library could not be found.</p>
    </div>
    )
  }
  return (
    <div className="bg-[#253237] rounded-lg h-full w-full overflow-hidden overflow-y-auto ">
      <Header>
        <div className="mt-20">
          <div className="flex flex-col md:flex-row items-center gap-x-5">
            <div className="relative h-16 w-16 lg:h-16 lg:w-16">
              <Image
                fill
                src="/images/Button-Favorite-icon.png"
                alt="PlayList"
                className="object-cover"
              />
            </div>
            <div className="flex flex-col gap-y-2 mt-4 md:mt-0">
              <p className="hidden md:block font-semibold text-sm">PlayList</p>
              <h1 className="text-white text-2xl sm:text-3xl lg:text-4xl font-bold">
              {`${libs.title}`}
              </h1>
            </div>
          </div>
        </div>
      </Header>
      {/* <LikedContent songs={songs} /> */}
    </div>
  );
};

export default Liked;
