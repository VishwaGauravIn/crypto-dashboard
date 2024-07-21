import { useEffect } from "react";
import useStore from "@/store/useStore";

const useAutoUpdateGlobal = () => {
  const fetchGlobalMarketCap = useStore((state) => state.fetchGlobalMarketCap);
  const fetchTrendingCoins = useStore((state) => state.fetchTrendingCoins);
  const fetchCoins = useStore((state) => state.fetchCoins);

  useEffect(() => {
    const fetchAll = () => {
      fetchGlobalMarketCap();
      fetchTrendingCoins();
      fetchCoins(1, 10);
    };

    const timeout = setTimeout(
      () => {
        fetchAll();
        const interval = setInterval(fetchAll, 5 * 60 * 1000);

        return () => clearInterval(interval);
      },
      5 * 60 * 1000
    );

    return () => clearTimeout(timeout);
  }, [fetchGlobalMarketCap, fetchTrendingCoins, fetchCoins]);
};

const useAutoUpdateCoin = (id: string, days: number) => {
  const fetchCoinChart = useStore((state) => state.fetchCoinChart);
  const fetchCoinDetails = useStore((state) => state.fetchCoinDetails);

  useEffect(() => {
    const fetchCoinData = () => {
      fetchCoinChart(id, days);
      fetchCoinDetails(id);
    };

    const timeout = setTimeout(
      () => {
        fetchCoinData();
        const interval = setInterval(fetchCoinData, 5 * 60 * 1000);

        return () => clearInterval(interval);
      },
      5 * 60 * 1000
    );

    return () => clearTimeout(timeout);
  }, [id, days, fetchCoinChart, fetchCoinDetails]);
};

export { useAutoUpdateGlobal, useAutoUpdateCoin };
