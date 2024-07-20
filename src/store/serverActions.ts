"use server";

import axios from "axios";

const API_KEY = process.env.COINGECKO_API_KEY;

export async function fetchGlobalMarketCap() {
  try {
    const response = await axios.get(
      "https://api.coingecko.com/api/v3/global",
      {
        headers: {
          Authorization: `Bearer ${API_KEY}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw new Error((error as Error).message);
  }
}

export async function fetchCoins(page = 1) {
  try {
    const response = await axios.get(
      "https://api.coingecko.com/api/v3/coins/markets?sparkline=true&price_change_percentage=24h",
      {
        headers: {
          Authorization: `Bearer ${API_KEY}`,
        },
        params: {
          vs_currency: "usd",
          order: "market_cap_desc",
          per_page: 100,
          page,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw new Error((error as Error).message);
  }
}

export async function fetchCoinDetails(id: string) {
  try {
    const response = await axios.get(
      `https://api.coingecko.com/api/v3/coins/${id}`,
      {
        headers: {
          Authorization: `Bearer ${API_KEY}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw new Error((error as Error).message);
  }
}

export async function fetchTrendingCoins() {
  try {
    const response = await axios.get(
      "https://api.coingecko.com/api/v3/search/trending",
      {
        headers: {
          Authorization: `Bearer ${API_KEY}`,
        },
      }
    );
    return response.data.coins;
  } catch (error) {
    throw new Error((error as Error).message);
  }
}
