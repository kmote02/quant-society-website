"use client";

import * as React from "react";
import axios from "axios";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface LiveStockCardProps {
  ticker: string;
}

export default function LiveStockCard({ ticker }: LiveStockCardProps) {
  const [priceChange, setPriceChange] = React.useState<number | null>(null);
  const [loading, setLoading] = React.useState<boolean>(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    const fetchStockData = async () => {
      try {
        const apiKey = process.env.NEXT_PUBLIC_API_KEY;
        const response = await axios.get(
          `https://financialmodelingprep.com/api/v3/stock-price-change/${ticker}?apikey=${apiKey}`
        );
        const change = response.data[0]["1D"];
        setPriceChange(change);
      } catch (err) {
        console.error("Failed to fetch stock data:", err);
        setError("Failed to load data");
      } finally {
        setLoading(false);
      }
    };

    fetchStockData();
  }, [ticker]);

  return (
    <Card className="text-foreground w-64 m-4 shadow-lg">
      <CardHeader className="flex flex-col items-center justify-center">
        <CardTitle className="text-xl">{ticker}</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center justify-center">
        {loading && <p>Loading...</p>}
        {error && <p className="text-red-500">{error}</p>}
        {!loading && !error && priceChange !== null && (
          <p
            className={`text-3xl font-bold ${
              priceChange > 0 ? "text-green-500" : "text-red-500"
            }`}
          >
            {priceChange > 0 ? "+" : ""}
            {priceChange.toFixed(2)}%
          </p>
        )}
      </CardContent>
    </Card>
  );
}
