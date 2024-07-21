import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
// import Link from "next/link";

// ? Use a good News API to fetch realtime-news related to cryptos

export default function News() {
  return (
    <section className="py-10">
      <div className="">
        <h2 className="mb-4 text-2xl font-bold">Latest Crypto News</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle>Cryptocurrency Regulations Tighten in Asia</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Governments in Asia are cracking down on cryptocurrency trading
                and usage, citing concerns over financial stability and consumer
                protection.
              </p>
            </CardContent>
            <CardFooter>
              <div className="flex items-center justify-between">
                <div className="text-xs text-muted-foreground">2 hours ago</div>
                {/* <Link href="#" className="text-primary" prefetch={false}>
                  Read more
                </Link> */}
              </div>
            </CardFooter>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>
                Ethereum Upgrade Promises Faster Transactions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                The highly anticipated Ethereum upgrade, known as the Merge, is
                expected to significantly improve transaction speeds and reduce
                energy consumption.
              </p>
            </CardContent>
            <CardFooter>
              <div className="flex items-center justify-between">
                <div className="text-xs text-muted-foreground">1 day ago</div>
                {/* <Link href="#" className="text-primary" prefetch={false}>
                  Read more
                </Link> */}
              </div>
            </CardFooter>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>
                Bitcoin Adoption Grows in Developing Countries
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                As traditional banking systems struggle, more people in
                developing nations are turning to cryptocurrencies like Bitcoin
                to store value and conduct transactions.
              </p>
            </CardContent>
            <CardFooter>
              <div className="flex items-center justify-between">
                <div className="text-xs text-muted-foreground">3 days ago</div>
                {/* <Link href="#" className="text-primary" prefetch={false}>
                  Read more
                </Link> */}
              </div>
            </CardFooter>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>
                Crypto Hedge Funds Struggle Amid Market Downturn
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                The recent cryptocurrency market downturn has led to significant
                losses for many crypto hedge funds, raising concerns about the
                long-term viability of the industry.
              </p>
            </CardContent>
            <CardFooter>
              <div className="flex items-center justify-between">
                <div className="text-xs text-muted-foreground">1 week ago</div>
                {/* <Link href="#" className="text-primary" prefetch={false}>
                  Read more
                </Link> */}
              </div>
            </CardFooter>
          </Card>
        </div>
      </div>
    </section>
  );
}
