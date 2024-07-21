"use client";

import TrendingCoins from "./TrendingCoins";
import MarketOutlook from "./MarketOutlook";
import News from "./News";
import TopCoins from "./TopCoins";
import { useAutoUpdateGlobal } from "@/store/useAutoUpdate";

export default function Dashboard({
  initialData,
}: {
  initialData: { topCoinsData: any; trendingCoinsData: any; globalData: any };
}) {
  useAutoUpdateGlobal();
  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <main className="flex flex-col-reverse lg:flex-row flex-1 gap-8 p-4 md:p-8 justify-between">
        <div className="w-full lg:w-8/12">
          <MarketOutlook initialData={initialData.globalData} />
          <News />
        </div>
        <div className="w-full lg:w-4/12 space-y-4">
          <TrendingCoins initialData={initialData.trendingCoinsData} />
          <TopCoins initialData={initialData.topCoinsData} />
        </div>
      </main>
    </div>
  );
}
