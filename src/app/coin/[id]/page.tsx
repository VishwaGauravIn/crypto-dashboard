import CoinDetails from "@/components/coinDetails";
import { fetchCoinChart, fetchCoinDetails } from "@/store/serverActions";
import React from "react";

export default async function CoinDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  const id = params.id;
  const initialData = {
    coinDetails: await fetchCoinDetails(id),
    chartData: await fetchCoinChart(id, 1),
  };

  return <CoinDetails intialData={initialData} id={id} />;
}
