"use client";

import Container from "@/container/Container";
import { demoCoins } from "@/store/demoData";
import useStore from "@/store/useStore";
import React, { useEffect } from "react";

export default function Home() {
  const {
    globalMarketCap,
    fetchGlobalMarketCap,
    loading,
    error,
    coins,
    fetchCoins,
    trendingCoins,
    fetchTrendingCoins,
  } = useStore((state) => ({
    globalMarketCap: state.globalMarketCap,
    fetchGlobalMarketCap: state.fetchGlobalMarketCap,
    coins: state.coins,
    fetchCoins: state.fetchCoins,
    trendingCoins: state.trendingCoins,
    fetchTrendingCoins: state.fetchTrendingCoins,
    loading: state.loading,
    error: state.error,
  }));

  // useEffect(() => {
  //   fetchTrendingCoins();
  // }, []);
  // console.log(trendingCoins);

  // if (loading) return <p>Loading...</p>;
  // if (error) return <p>Error: {error}</p>;
  console.log(demoCoins);
  return <Container className="">Hello India</Container>;
}
