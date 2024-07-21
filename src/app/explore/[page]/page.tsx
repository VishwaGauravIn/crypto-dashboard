import Explore from "@/components/explore";
import { fetchCoins } from "@/store/serverActions";
import { redirect } from "next/navigation";
import React from "react";

export default async function ExplorePage({
  params,
}: {
  params: { page: string };
}) {
  const page = params.page as string;
  if (!page || Number.isNaN(parseInt(page)) || parseInt(page) < 1){
    redirect("/explore/1");
  }
  if (parseInt(page) > 250) {
    redirect("/explore/250");
  }
  const initialData = await fetchCoins(parseInt(page), 50);
  return <Explore initialData={initialData} page={parseInt(page)} />;
}
