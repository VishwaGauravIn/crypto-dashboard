import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import {
  BarChartIcon,
  BitcoinIcon,
  CoinsIcon,
  DollarSignIcon,
  EclipseIcon,
  TrendingUpIcon,
  WavesIcon,
} from "lucide-react";

export default function MarketOutlook() {
  return (
    <div className="flex-1 space-y-4">
      <p className="text-3xl font-semibold text-muted-foreground">
        Market Outlook
      </p>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Total Market Cap
            </CardTitle>
            <DollarSignIcon className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$1.2T</div>
            <p className="text-xs text-muted-foreground">
              +5.2% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Change</CardTitle>
            <TrendingUpIcon className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+12.3%</div>
            <p className="text-xs text-muted-foreground">from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Coins</CardTitle>
            <CoinsIcon className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+20,000</div>
            <p className="text-xs text-muted-foreground">
              +500 from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Bitcoin Change
            </CardTitle>
            <BitcoinIcon className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+8.1%</div>
            <p className="text-xs text-muted-foreground">from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Ethereum Change
            </CardTitle>
            <EclipseIcon className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+12.4%</div>
            <p className="text-xs text-muted-foreground">from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Litecoin Change
            </CardTitle>
            <BitcoinIcon className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+6.7%</div>
            <p className="text-xs text-muted-foreground">from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Ripple Change</CardTitle>
            <WavesIcon className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+3.2%</div>
            <p className="text-xs text-muted-foreground">from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Volume</CardTitle>
            <BarChartIcon className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$45B</div>
            <p className="text-xs text-muted-foreground">
              +10% from last month
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
