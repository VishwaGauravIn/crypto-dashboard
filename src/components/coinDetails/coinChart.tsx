"use client";

import { Line, LineChart, XAxis, YAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useCallback, useEffect, useMemo, useState } from "react";
import useStore from "@/store/useStore";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { useAutoUpdateCoin } from "@/store/useAutoUpdate";

export function CoinChart({
  id,
  coinData,
  initialData,
}: {
  id: string;
  coinData: any;
  initialData: any;
}) {
  const [days, setDays] = useState(1);
  const [coinChartData, setCoinChartData] = useState(initialData);
  const { coinChart, loading, error } = useStore((state) => ({
    coinChart: state.coinChart,
    loading: state.loadingCoinChart,
    error: state.errorCoinChart,
  }));

  const chartData = useMemo(
    () =>
      coinChartData?.prices?.map(([timestamp, price]: [number, number]) => ({
        timestamp,
        price,
      })),
    [coinChartData]
  );

  const chartConfig = useMemo(
    () => ({
      price: {
        label: "Price",
        color: "hsl(var(--chart-1))",
      },
      timestamp: {
        label: "Time",
        color: "hsl(var(--chart-0))",
      },
    }),
    []
  );

  const prices = useMemo(
    () => chartData?.map((data: any) => data.price) || [],
    [chartData]
  );
  const minPrice = useMemo(() => Math.min(...prices), [prices]);
  const maxPrice = useMemo(() => Math.max(...prices), [prices]);

  useEffect(() => {
    if (!loading && coinChart?.prices?.length > 0) {
      setCoinChartData(coinChart);
    }
  }, [loading, coinChart, id, days]);

  useAutoUpdateCoin(id, days);

  if (error) {
    toast.error("Error Fetching Graph");
  }
  const handleDaysChange = useCallback((newDays: number): void => {
    setDays(newDays);
  }, []);
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          {coinData.name} ({coinData.symbol})
        </CardTitle>
        <CardDescription>
          CMP: $ {coinData.market_data.current_price.usd}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <LineChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <XAxis
              dataKey="timestamp"
              tickFormatter={(unixTime) =>
                new Date(unixTime).toLocaleTimeString()
              }
              hide
            />
            <YAxis
              dataKey="price"
              domain={[minPrice, maxPrice]}
              tickFormatter={(value) => `$${value.toFixed(7)}`}
              hide
            />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  labelFormatter={(label, value) => {
                    return new Date(
                      value[0].payload.timestamp
                    ).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                      hour: "numeric",
                      minute: "numeric",
                    });
                  }}
                />
              }
            />

            <Line
              type="monotone"
              dataKey="price"
              stroke="var(--color-price)"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="text-xs sm:text-sm justify-center gap-2 flex-wrap">
        <button
          onClick={() => handleDaysChange(1)}
          className={cn("p-2 border flex gap-1 rounded-md", {
            "bg-[hsl(var(--chart-1))] text-white": days === 1,
          })}
        >
          1D :
          <span className="">
            {coinData.market_data.price_change_percentage_24h_in_currency.usd.toFixed(
              2
            )}
            %
          </span>
        </button>
        <button
          onClick={() => handleDaysChange(7)}
          className={cn("p-2 border flex gap-1 rounded-md", {
            "bg-[hsl(var(--chart-1))] text-white": days === 7,
          })}
        >
          1W :
          <span className="">
            {coinData.market_data.price_change_percentage_7d_in_currency.usd.toFixed(
              2
            )}
            %
          </span>
        </button>
        <button
          onClick={() => handleDaysChange(30)}
          className={cn("p-2 border flex gap-1 rounded-md", {
            "bg-[hsl(var(--chart-1))] text-white": days === 30,
          })}
        >
          1M :
          <span className="">
            {coinData.market_data.price_change_percentage_30d_in_currency.usd.toFixed(
              2
            )}
            %
          </span>
        </button>
        <button
          onClick={() => handleDaysChange(365)}
          className={cn("p-2 border flex gap-1 rounded-md", {
            "bg-[hsl(var(--chart-1))] text-white": days === 365,
          })}
        >
          1Y :
          <span className="">
            {coinData.market_data.price_change_percentage_1y_in_currency.usd.toFixed(
              2
            )}
            %
          </span>
        </button>
      </CardFooter>
    </Card>
  );
}
