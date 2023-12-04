import { getLikedSongs } from "@/actions/getLikedSongs";
import { Header } from "@/components/Header";
import Image from "next/image";
import AllContent from "./components/AllContent";
import { getLib } from "@/actions/getLib";

export const revalidate = 0;
const LibPage = async () => {
  const libs = await getLib();
  return (
    <div className="bg-[#253237] rounded-lg h-full w-full overflow-hidden overflow-y-auto ">
      <Header>
        <div className="mt-20">
          <div className="flex flex-col md:flex-row items-center gap-x-5">
            <div className="relative h-16 w-16 lg:h-16 lg:w-16">
              <Image
                fill
                src="/images/song-icon-png-25.jpg"
                alt="PlayList"
                className="object-cover"
              />
            </div>
            <div className="flex flex-col gap-y-2 mt-4 md:mt-0">
              <p className="hidden md:block font-semibold text-sm">PlayList</p>
              <h1 className="text-white text-2xl sm:text-3xl lg:text-4xl font-bold">Discover All Playlists</h1>
            </div>
          </div>
        </div>
      </Header>
      <AllContent libs={libs} />
    </div>
  );
};

export default LibPage;
