"use client";

import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import Image from "next/image";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "../ui/pagination";
import { Badge } from "../ui/badge";
import { useRouter } from "next/navigation";

export default function Explore({
  initialData,
  page,
}: {
  initialData: any;
  page: number;
}) {
  const router = useRouter();
  return (
    <>
      <section className="w-full py-12">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="flex flex-col gap-4 md:gap-6">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold tracking-tight">
                Explore Crypto Coins
              </h1>
            </div>
            <div className="border shadow-sm rounded-lg overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[50px]">Icon</TableHead>
                    <TableHead>Symbol</TableHead>
                    <TableHead className="text-right">Price</TableHead>
                    <TableHead className="text-right">24h %</TableHead>
                    <TableHead className="text-right">
                      Market Cap 24h %
                    </TableHead>
                    <TableHead className="text-right">24h High</TableHead>
                    <TableHead className="text-right">24h Low</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {initialData.map((coin: any) => (
                    <TableRow
                      key={coin.id}
                      onClick={() => router.push("/coin/" + coin.id)}
                      className="cursor-pointer"
                    >
                      <TableCell>
                        <Image
                          src={
                            coin.image.replace("/large/", "/small/") ||
                            coin.image
                          }
                          alt={coin.symbol}
                          width={24}
                          height={24}
                          className="rounded-full"
                        />
                      </TableCell>
                      <TableCell>{coin.symbol}</TableCell>
                      <TableCell className="text-right">
                        ${coin.current_price.toFixed(7)}
                      </TableCell>
                      <TableCell
                        className={`text-right ${
                          coin.price_change_percentage_24h >= 0
                            ? "text-green-500"
                            : "text-red-500"
                        }`}
                      >
                        {coin.price_change_percentage_24h.toFixed(2)}%
                      </TableCell>
                      <TableCell
                        className={`text-right ${
                          coin.market_cap_change_percentage_24h >= 0
                            ? "text-green-500"
                            : "text-red-500"
                        }`}
                      >
                        {coin.market_cap_change_percentage_24h.toFixed(2)}%
                      </TableCell>
                      <TableCell className="text-right">
                        ${coin.high_24h.toFixed(2)}
                      </TableCell>
                      <TableCell className="text-right">
                        ${coin.low_24h.toFixed(2)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            <div className="flex items-center justify-center">
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    {page > 1 && (
                      <PaginationPrevious href={`/explore/${page - 1}`} />
                    )}
                  </PaginationItem>
                  <Badge variant="outline">{page}</Badge>
                  <PaginationItem>
                    {page < 250 && (
                      <PaginationNext href={`/explore/${page + 1}`} />
                    )}
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
