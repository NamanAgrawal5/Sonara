"use client";

import LibItem from "@/components/LibItem";
import { useUser } from "@/hooks/useUser";
import { Lib } from "@/types";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
interface AllContentProps {
  libs: Lib[];
}
const AllContent: React.FC<AllContentProps> = ({ libs }) => {
  const router = useRouter();
  const { isLoading, user } = useUser();
  useEffect(() => {
    if (!isLoading && !user) {
      router.replace("/");
    }
  }, [isLoading, user, router]);
  if (libs.length === 0) {
    return (
      <div className="flex flex-col gap-y-2 w-full px-6 text-neutral-400">
        No  Library Uploaded
      </div>
    );
  }
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-8 gap-4 mt-4">
      {libs.map((lib) => (
        <div key={lib.library_id}>
            <LibItem data={lib} />
        </div>
      ))}
    </div>
  );
};

export default AllContent;
