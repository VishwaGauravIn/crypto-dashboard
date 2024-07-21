import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import {
  BitcoinIcon,
  CoinsIcon,
  DollarSignIcon,
  EclipseIcon,
  ListPlusIcon,
  ShieldXIcon,
  StoreIcon,
} from "lucide-react";
import { toast } from "sonner";
import useStore from "@/store/useStore";
import numPrettier from "@/lib/numPrettier";

export default function MarketOutlook({ initialData }: { initialData: any }) {
  const [marketOutlookData, setMarketOutlookData] = useState(initialData);
  const { marketOutlook, loading, error } = useStore((state) => ({
    marketOutlook: state.globalMarketCap,
    loading: state.loadingGlobalMarketCap,
    error: state.errorGlobalMarketCap,
  }));

  useEffect(() => {
    if (!loading && marketOutlook?.length > 0) {
      setMarketOutlookData(marketOutlook);
    }
  }, [loading, marketOutlook]);

  if (error) {
    toast.error("Error Fetching Market Outlook");
  }
  return (
    <div className="flex-1 space-y-4">
      <p className="text-3xl font-semibold text-muted-foreground">
        Market Outlook
      </p>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Total Market Cap Change
            </CardTitle>
            <DollarSignIcon className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {marketOutlookData.data.market_cap_change_percentage_24h_usd.toFixed(
                2
              )}
              %
            </div>
            <p className="text-xs text-muted-foreground">in USD ($)</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Markets</CardTitle>
            <StoreIcon className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {marketOutlookData.data.markets}
            </div>
            <p className="text-xs text-muted-foreground">updated recently</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Coins</CardTitle>
            <CoinsIcon className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {marketOutlookData.data.active_cryptocurrencies}
            </div>
            <p className="text-xs text-muted-foreground">active currently</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Bitcoin Market Cap
            </CardTitle>
            <BitcoinIcon className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {marketOutlookData.data.market_cap_percentage.btc.toFixed(2)}%
            </div>
            <p className="text-xs text-muted-foreground">lifetime</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Bitcoin Volume
            </CardTitle>
            <BitcoinIcon className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {numPrettier(marketOutlookData.data.total_volume.btc, 2)}
            </div>
            <p className="text-xs text-muted-foreground">recently updated</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Ethereum Market Cap
            </CardTitle>
            <EclipseIcon className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {marketOutlookData.data.market_cap_percentage.eth.toFixed(2)}%
            </div>
            <p className="text-xs text-muted-foreground">lifetime</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Ethereum Volume
            </CardTitle>
            <EclipseIcon className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {numPrettier(marketOutlookData.data.total_volume.eth, 2)}
            </div>
            <p className="text-xs text-muted-foreground">recently updated</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Ongoing ICOs</CardTitle>
            <CoinsIcon className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {marketOutlookData.data.ongoing_icos}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Upcoming ICOs</CardTitle>
            <ListPlusIcon className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {marketOutlookData.data.upcoming_icos}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Ended ICOs</CardTitle>
            <ShieldXIcon className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {marketOutlookData.data.ended_icos}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
