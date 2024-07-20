import create from "zustand";
import axios from "axios";

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

const API_KEY = process.env.NEXT_PUBLIC_COINGECKO_API_KEY;

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
      const response = await axios.get(
        "https://api.coingecko.com/api/v3/global",
        {
          headers: {
            Authorization: `Bearer ${API_KEY}`,
          },
        }
      );
      set({ globalMarketCap: response.data, loading: false });
    } catch (error) {
      set({ error: (error as Error).message, loading: false });
    }
  },

  fetchCoins: async (page = 1) => {
    set({ loading: true });
    try {
      const response = await axios.get(
        "https://api.coingecko.com/api/v3/coins/markets",
        {
          headers: {
            Authorization: `Bearer ${API_KEY}`,
          },
          params: {
            vs_currency: "inr",
            order: "market_cap_desc",
            per_page: 100,
            page,
          },
        }
      );
      set((state) => ({
        coins: [...state.coins, ...response.data],
        loading: false,
      }));
    } catch (error) {
      set({ error: (error as Error).message, loading: false });
    }
  },

  fetchCoinDetails: async (id) => {
    set({ loading: true });
    try {
      const response = await axios.get(
        `https://api.coingecko.com/api/v3/coins/${id}`,
        {
          headers: {
            Authorization: `Bearer ${API_KEY}`,
          },
        }
      );
      set({ coinDetails: response.data, loading: false });
    } catch (error) {
      set({ error: (error as Error).message, loading: false });
    }
  },

  fetchTrendingCoins: async () => {
    set({ loading: true });
    try {
      const response = await axios.get(
        "https://api.coingecko.com/api/v3/search/trending",
        {
          headers: {
            Authorization: `Bearer ${API_KEY}`,
          },
        }
      );
      set({ trendingCoins: response.data.coins, loading: false });
    } catch (error) {
      set({ error: (error as Error).message, loading: false });
    }
  },
}));

export default useStore;
