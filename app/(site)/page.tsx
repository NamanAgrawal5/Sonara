import { getSongs } from "@/actions/getSongs";
import { Header } from "@/components/Header";
import ListItem from "@/components/ListItem";
import PageContent from "./components/PageContent";
import { AiOutlineArrowsAlt } from "react-icons/ai";
import Button from "./components/Button";
export const revalidate = 0;
export default async function Home() {
  const songs = await getSongs();
  return (
    <div className="bg-[#253237] rounded-lg h-full w-full overflow-hidden overflow-y-auto">
      <Header>
        <div className="mb-2">
          <h1 className="text-[#E0FBFC] text-3xl font-semibold">
            Hey Melophile 🎧
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-3 mt-4">
            <ListItem
              image="/images/Button-Favorite-icon.png"
              name="Favorite Songs"
              href="favorite"
            />
          </div>
        </div>
      </Header>
      <div className="mt-2 mb-7 px-6">
        <div className="flex justify-between items-center">
          <h1 className="text-[#E0FBFC] text-2xl font-semibold">
            Latest Songs
          </h1>
         <Button />
        </div>
        <PageContent songs={songs} />
      </div>
    </div>
  );
}
