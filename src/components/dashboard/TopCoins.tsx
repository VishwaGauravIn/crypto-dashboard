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
import { BadgePlusIcon, CrownIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import numPrettier from "@/lib/numPrettier";
import useStore from "@/store/useStore";
import { toast } from "sonner";
import Link from "next/link";

export default function TopCoins({ initialData }: { initialData: any }) {
  const [topCoinsData, setTopCoinsData] = useState(initialData);
  const { topCoins, loading, error } = useStore((state) => ({
    topCoins: state.coins,
    loading: state.loadingCoins,
    error: state.errorCoins,
  }));

  useEffect(() => {
    if (!loading && topCoins?.length > 0) {
      setTopCoinsData(topCoins);
    }
  }, [loading, topCoins]);

  if (error) {
    toast.error("Error Fetching Top Coins");
  }
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">Top Coins</CardTitle>
        <CrownIcon className="w-4 h-4 text-muted-foreground" />
      </CardHeader>
      <CardContent className="flex flex-col">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Coin</TableHead>
              <TableHead>Total Volume</TableHead>
              <TableHead>Price (24hrs)</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {topCoinsData.slice(0, 10).map((coin: any) => (
              <TableRow key={coin.id}>
                <TableCell>
                  <Link href={`/coin/${coin.id}`}>
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
                  </Link>
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
        <Badge variant="outline" className="py-2 px-4 self-center">
          <BadgePlusIcon className="w-4 h-4 mr-2" /> Explore More
        </Badge>
      </CardContent>
    </Card>
  );
}
