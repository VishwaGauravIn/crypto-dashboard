import React, { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { TrendingUpIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import useStore from "@/store/useStore";
import { toast } from "sonner";

export default function TrendingCoins({ initialData }: { initialData: any }) {
  const [trendingCoinsData, setTrendingCoinsData] = useState(initialData);
  const { trendingCoins, fetchTrendingCoins, loading, error } = useStore(
    (state) => ({
      trendingCoins: state.trendingCoins,
      fetchTrendingCoins: state.fetchTrendingCoins,
      loading: state.loadingTrendingCoins,
      error: state.errorTrendingCoins,
    })
  );

  useEffect(() => {
    if (!loading && trendingCoins?.length > 0) {
      setTrendingCoinsData(trendingCoins);
    }

    const interval = setInterval(() => fetchTrendingCoins(), 5 * 60 * 1000);

    return () => clearInterval(interval);
  }, [loading, trendingCoins, fetchTrendingCoins]);

  if (error) {
    toast.error("Error Fetching Trending Coins");
  }
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">Trending Coins</CardTitle>
        <TrendingUpIcon className="w-4 h-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Coin</TableHead>
              <TableHead>Price Change (24hrs)</TableHead>
              <TableHead>Last Week</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {trendingCoinsData.slice(0, 10).map((coin: any) => (
              <TableRow key={coin.item.id}>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Image
                      src={coin.item.thumb}
                      alt={coin.item.name}
                      width={24}
                      height={24}
                      className="rounded-full"
                    />
                    <span className="font-medium">{coin.item.symbol}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge
                    variant="outline"
                    className={
                      coin.item.data.price_change_percentage_24h.usd > 0
                        ? "text-green-500"
                        : "text-red-500"
                    }
                  >
                    {coin.item.data.price_change_percentage_24h.usd.toFixed(2)}%
                  </Badge>
                </TableCell>
                <TableCell>
                  <Image
                    src={coin.item.data.sparkline}
                    alt={coin.item.name}
                    width={100}
                    height={50}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
