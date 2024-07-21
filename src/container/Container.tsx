import Footer from "@/components/global/Footer/indes";
import Header from "@/components/global/Header";
import { cn } from "@/lib/utils";
import { demoSearchData } from "@/store/searchData";
// import { fetchAllCoins } from "@/store/serverActions";
import React, { ReactNode } from "react";

export default async function Container({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  // const searchData = await fetchAllCoins();
  // ? using local search data to avoid API rate limit issue, because at peak time the API rate limit is reduced to almost 10 req per minute by coingecko which will break functionality of the app if we use API calls for search data too, which is static data and doesn't change frequently
  const searchData = demoSearchData;
  return (
    <div className={cn("flex min-h-screen w-full flex-col", className)}>
      <Header searchData={searchData} />
      {children}
      <Footer />
    </div>
  );
}
