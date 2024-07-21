import Dashboard from "@/components/dashboard";
import { fetchCoins, fetchTrendingCoins } from "@/store/serverActions";

export default async function Home() {
    const initialData = {
      topCoinsData: await fetchCoins(1, 10),
      trendingCoinsData: await fetchTrendingCoins(),
    }
  return (
      <Dashboard initialData = {initialData} />
  );
}
