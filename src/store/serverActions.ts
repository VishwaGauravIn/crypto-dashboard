"use server";

import axios from "axios";
import { redirect } from "next/navigation";

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

export async function fetchCoins(
  page = 1,
  per_page = 100,
  order = "market_cap_desc"
) {
  try {
    const response = await axios.get(
      "https://api.coingecko.com/api/v3/coins/markets?price_change_percentage=24h",
      {
        headers: {
          Authorization: `Bearer ${API_KEY}`,
        },
        params: {
          vs_currency: "usd",
          order: order,
          per_page: per_page,
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
      `https://api.coingecko.com/api/v3/coins/${id}?localization=false&tickers=false&market_data=true`,
      {
        headers: {
          Authorization: `Bearer ${API_KEY}`,
        },
      }
    );
    return response.data;
  } catch (error: any) {
    if (error?.response.status == 404) {
      redirect("/404");
    } else {
      throw new Error((error as Error).message);
    }
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

export async function fetchCoinChart(id: string, days: number) {
  try {
    const response = await axios.get(
      `https://api.coingecko.com/api/v3/coins/${id}/market_chart`,
      {
        headers: {
          Authorization: `Bearer ${API_KEY}`,
        },
        params: {
          vs_currency: "usd",
          days: days,
          interval: days > 29 ? "daily" : "",
        },
      }
    );
    return response.data;
  } catch (error) {
    throw new Error((error as Error).message);
  }
}

// ? We can't use search API due to API rate limits and fetching all coins is not feasible for demoing purposes, but we can fetch it once and cache it as it would save tons of search API hits
// export async function fetchAllCoins() {
//   try {
//     const response = await axios.get(
//       "https://api.coingecko.com/api/v3/coins/list",
//       {
//         headers: {
//           Authorization: `Bearer ${API_KEY}`,
//         },
//       }
//     );
//     return response.data;
//   } catch (error) {
//     throw new Error((error as Error).message);
//   }
// }

// ? For Now using this as a workaround, fetching top 100 coins
export async function fetchAllCoins() {
  return fetchCoins(1, 100);
}
