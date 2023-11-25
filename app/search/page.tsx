import { getSongsByTitle } from "@/actions/getSongsByTitle";
import { Header } from "@/components/Header";
import SearchInput from "@/components/SearchInput";
import SearchContent from "./components/SearchContent";

interface SearchProps {
  searchParams: {
    title: string;
  };
}
export const revalidate = 0;
const Search = async ({ searchParams }: SearchProps) => {
  const songs = await getSongsByTitle(searchParams.title);
  return (
  <div className="bg-[#253237] rounded-lg h-full w-full overflow-hidden overflow-y-auto">
      <Header className="from-bg-[#253237]">
        <div className="mb-2 flex flex-vol gap-y-6">
            <h1 className="text-white text-3xl font-semibold">Search</h1>
        </div>
            <SearchInput />
      </Header>
      <SearchContent songs={songs} />
    </div>
  );
};

export default Search;
