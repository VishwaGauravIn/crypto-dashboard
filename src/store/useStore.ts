import { create } from "zustand";
import * as serverActions from "./serverActions";

interface GlobalMarketCap {
  market_cap: number;
}

interface Coin {
  id: string;
  name: string;
  current_price: number;
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
  trendingCoins: Coin[];
  loading: boolean;
  error: string | null;
  fetchGlobalMarketCap: () => Promise<void>;
  fetchCoins: (page?: number) => Promise<void>;
  fetchTrendingCoins: () => Promise<void>;
  fetchCoinDetails: (id: string) => Promise<void>;
}

const useStore = create<StoreState>((set) => ({
  globalMarketCap: [],
  coins: [],
  coinDetails: null,
  trendingCoins: [],
  loading: false,
  error: null,

  fetchGlobalMarketCap: async () => {
    set({ loading: true });
    try {
      const data = await serverActions.fetchGlobalMarketCap();
      set({ globalMarketCap: data, loading: false });
    } catch (error) {
      set({ error: (error as Error).message, loading: false });
    }
  },

  fetchCoins: async (page = 1) => {
    set({ loading: true });
    try {
      const data = await serverActions.fetchCoins(page);
      set((state) => ({
        coins: [...state.coins, ...data],
        loading: false,
      }));
    } catch (error) {
      set({ error: (error as Error).message, loading: false });
    }
  },

  fetchCoinDetails: async (id) => {
    set({ loading: true });
    try {
      const data = await serverActions.fetchCoinDetails(id);
      set({ coinDetails: data, loading: false });
    } catch (error) {
      set({ error: (error as Error).message, loading: false });
    }
  },

  fetchTrendingCoins: async () => {
    set({ loading: true });
    try {
      const data = await serverActions.fetchTrendingCoins();
      set({ trendingCoins: data, loading: false });
    } catch (error) {
      set({ error: (error as Error).message, loading: false });
    }
  },
}));

export default useStore;
