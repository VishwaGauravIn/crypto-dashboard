/* eslint-disable no-unused-vars */
import { create } from "zustand";
import * as serverActions from "./serverActions";
import { checkRateLimit } from "./rateLimit";

interface GlobalMarketCap {
  market_cap: number;
}

interface Coin {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  market_cap: number;
  market_cap_rank: number;
  fully_diluted_valuation: number;
  total_volume: number;
  high_24h: number;
  low_24h: number;
  price_change_24h: number;
  price_change_percentage_24h: number;
  market_cap_change_24h: number;
  market_cap_change_percentage_24h: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number;
  ath: number;
  ath_change_percentage: number;
  ath_date: string;
  atl: number;
  atl_change_percentage: number;
  atl_date: string;
  roi: string | null;
  last_updated: string;
  price_change_percentage_1h: number;
  sparkline_in_7d: {
    price: number[];
  };
}

interface CoinDetails {
  id: string;
  name: string;
  market_data: {
    current_price: {
      usd: number;
    };
    sparkline_7d: {
      price: number[];
    };
  };
}

interface StoreState {
  globalMarketCap: GlobalMarketCap[];
  coins: Coin[];
  coinDetails: CoinDetails | null;
  trendingCoins: {
    item: {
      id: string;
      name: string;
      symbol: string;
      thumb: string;
      data: {
        price_change_percentage_24h: {
          usd: number;
        };
        sparkline: string;
      };
    };
  }[];
  coinChart: {
    prices: number[][];
    market_caps: number[][];
    total_volumes: number[][];
  };
  loadingGlobalMarketCap: boolean;
  loadingCoins: boolean;
  loadingCoinDetails: boolean;
  loadingTrendingCoins: boolean;
  loadingCoinChart: boolean;
  errorGlobalMarketCap: string | null;
  errorCoins: string | null;
  errorCoinDetails: string | null;
  errorTrendingCoins: string | null;
  errorCoinChart: string | null;
  fetchGlobalMarketCap: () => Promise<void>;
  fetchCoins: (
    page?: number,
    per_page?: number,
    order?: string
  ) => Promise<void>;
  fetchTrendingCoins: () => Promise<void>;
  fetchCoinDetails: (id: string) => Promise<void>;
  fetchCoinChart: (id: string, days: number) => Promise<void>;
}

const useStore = create<StoreState>((set) => ({
  globalMarketCap: [],
  coins: [],
  coinDetails: null,
  trendingCoins: [],
  coinChart: {
    prices: [],
    market_caps: [],
    total_volumes: [],
  },
  loadingGlobalMarketCap: false,
  loadingCoins: false,
  loadingCoinDetails: false,
  loadingTrendingCoins: false,
  loadingCoinChart: false,
  errorGlobalMarketCap: null,
  errorCoins: null,
  errorCoinDetails: null,
  errorTrendingCoins: null,
  errorCoinChart: null,

  fetchGlobalMarketCap: async () => {
    const key = "fetchGlobalMarketCap";

    if (checkRateLimit(key).allowed) {
      set({ loadingGlobalMarketCap: true });
      try {
        const data = await serverActions.fetchGlobalMarketCap();
        set({ globalMarketCap: data, loadingGlobalMarketCap: false });
      } catch (error) {
        set({
          errorGlobalMarketCap: (error as Error).message,
          loadingGlobalMarketCap: false,
        });
      }
    }
  },

  fetchCoins: async (page = 1, per_page = 100, order = "market_cap_desc") => {
    const key = "fetchCoins" + page + per_page + order;

    if (checkRateLimit(key).allowed) {
      set({ loadingCoins: true });
      try {
        const data = await serverActions.fetchCoins(page, per_page, order);
        set((state) => ({
          coins: [...state.coins, ...data],
          loadingCoins: false,
        }));
      } catch (error) {
        set({ errorCoins: (error as Error).message, loadingCoins: false });
      }
    }
  },

  fetchCoinDetails: async (id) => {
    const key = "fetchCoinDetails" + id;

    if (checkRateLimit(key).allowed) {
      set({ loadingCoinDetails: true });
      try {
        const data = await serverActions.fetchCoinDetails(id);
        set({ coinDetails: data, loadingCoinDetails: false });
      } catch (error) {
        set({
          errorCoinDetails: (error as Error).message,
          loadingCoinDetails: false,
        });
      }
    }
  },

  fetchTrendingCoins: async () => {
    const key = "fetchTrendingCoins";

    if (checkRateLimit(key).allowed) {
      set({ loadingTrendingCoins: true });
      try {
        const data = await serverActions.fetchTrendingCoins();
        set({ trendingCoins: data, loadingTrendingCoins: false });
      } catch (error) {
        set({
          errorTrendingCoins: (error as Error).message,
          loadingTrendingCoins: false,
        });
      }
    }
  },

  fetchCoinChart: async (id, days) => {
    const key = "fetchCoinChart" + id + days;

    if (checkRateLimit(key).allowed) {
      set({ loadingCoinChart: true });
      try {
        const data = await serverActions.fetchCoinChart(id, days);
        set({ coinChart: data, loadingCoinChart: false });
      } catch (error) {
        set({
          errorCoinChart: (error as Error).message,
          loadingCoinChart: false,
        });
      }
    }
  },
}));

export default useStore;
