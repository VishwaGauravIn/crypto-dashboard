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
import { CrownIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import numPrettier from "@/lib/numPrettier";
import useStore from "@/store/useStore";
import { toast } from "sonner";

export default function TopCoins({ initialData }: { initialData: any }) {
  const [topCoinsData, setTopCoinsData] = useState(initialData);
  const { topCoins, fetchTopCoins, loading, error } = useStore((state) => ({
    topCoins: state.coins,
    fetchTopCoins: state.fetchCoins,
    loading: state.loadingCoins,
    error: state.errorCoins,
  }));

  useEffect(() => {
    if (!loading && topCoins?.length > 0) {
      setTopCoinsData(topCoins);
    }

    const interval = setInterval(() => fetchTopCoins(), 5 * 60 * 1000);

    return () => clearInterval(interval);
  }, [loading, topCoins, fetchTopCoins]);

  if (error) {
    toast.error("Error Fetching Top Coins");
  }
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">Top Coins</CardTitle>
        <CrownIcon className="w-4 h-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Coin</TableHead>
              <TableHead>Total Volume</TableHead>
              <TableHead>Price (24hrs)</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {topCoinsData.map((coin: any) => (
              <TableRow key={coin.id}>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Image
                      src={
                        coin.image.replace("/large/", "/small/") || coin.image
                      }
                      alt={coin.name}
                      width={24}
                      height={24}
                      className="rounded-full"
                    />
                    <span className="font-medium">{coin.symbol}</span>
                  </div>
                </TableCell>
                <TableCell>{numPrettier(coin.total_volume, 2)}</TableCell>
                <TableCell>
                  <Badge
                    variant="outline"
                    className={
                      coin.price_change_percentage_24h > 0
                        ? "text-green-500"
                        : "text-red-500"
                    }
                  >
                    {coin.price_change_percentage_24h.toFixed(2)}%
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}