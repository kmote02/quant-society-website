"use client";

import * as React from "react";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectItem,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { DateRange } from "react-day-picker";

export default function Page() {
  const [query, setQuery] = React.useState("");
  const [results, setResults] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [selectedStock, setSelectedStock] = React.useState<{
    name: string;
    symbol: string;
    stockExchange: string;
  } | null>(null);
  const [dateRange, setDateRange] = React.useState<DateRange | undefined>({
    from: new Date(),
    to: new Date(),
  });
  const [selectedUrl, setSelectedUrl] = React.useState<string | null>(null);
  const [apiResponse, setApiResponse] = React.useState<any>(null);

  // ------------------------------------------------
  // 1) Search for stocks
  // ------------------------------------------------
  const handleSearch = async () => {
    if (!query) return;

    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(
        `https://financialmodelingprep.com/api/v3/search?query=${query}&limit=9&apikey=${process.env.NEXT_PUBLIC_API_KEY}`
      );
      setResults(response.data);
    } catch (err) {
      console.error("Failed to fetch search results:", err);
      setError("Failed to fetch data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // ------------------------------------------------
  // 2) Select a stock from the search results
  // ------------------------------------------------
  const handleCardSelect = (result: {
    name: string;
    symbol: string;
    stockExchange: string;
  }) => {
    setSelectedStock(result);
    setResults([]);
    setQuery("");
  };

  // ------------------------------------------------
  // 3) Call the selected API endpoint
  // ------------------------------------------------
  const handleApiCall = async () => {
    if (!selectedUrl || !selectedStock || !dateRange?.from || !dateRange?.to) return;

    const formattedFrom = dateRange.from.toISOString().split("T")[0];
    const formattedTo = dateRange.to.toISOString().split("T")[0];

    // Dynamically adjust the URL with symbol, date range, and API key
    const urlWithParams = selectedUrl
      .replace("AAPL", selectedStock.symbol)
      .replace("from=2018-03-12", `from=${formattedFrom}`)
      .replace("to=2019-03-12", `to=${formattedTo}`)
      .replace("YOUR_API_KEY", process.env.NEXT_PUBLIC_API_KEY || "");

    try {
      console.log(`Calling ${urlWithParams}`);
      const response = await axios.get(urlWithParams);
      setApiResponse(response.data);
    } catch (err: any) {
      console.error("Error fetching data:", err);
      setApiResponse(`Error: ${err.message}`);
    }
  };

  // ------------------------------------------------
  // 4) Download data as CSV
  // ------------------------------------------------
  const handleDownloadCSV = () => {
    if (!apiResponse) return;

    let rows: string[] = [];

    if (Array.isArray(apiResponse)) {
      if (apiResponse.length > 0) {
        const headers = Object.keys(apiResponse[0]);
        rows.push(headers.join(","));

        apiResponse.forEach((obj: any) => {
          rows.push(Object.values(obj).join(","));
        });
      }
    } else if (apiResponse.historical && Array.isArray(apiResponse.historical)) {
      const data = apiResponse.historical;
      if (data.length > 0) {
        const headers = Object.keys(data[0]);
        rows.push(headers.join(","));

        data.forEach((obj: any) => {
          rows.push(Object.values(obj).join(","));
        });
      }
    } else {
      console.error("Unexpected API response format:", apiResponse);
      return;
    }

    const csvContent = rows.join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "stock_data.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-start p-8 bg-background text-foreground">
      {/* Title */}
      <h1 className="text-6xl md:text-7xl font-bold text-primary mb-8 text-center">
        MUN Quant Society
      </h1>

      {/* Search Bar */}
      <div className="flex w-full max-w-2xl items-center space-x-4 mb-4">
        <Input
          type="text"
          placeholder="Search for a stock (e.g., AAPL)"
          className="flex-1 py-3 px-4 border border-border rounded-md"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
        />
        <Button onClick={handleSearch} disabled={loading} className="bg-primary text-primary-foreground">
          {loading ? "Searching..." : "Search"}
        </Button>
      </div>

      {error && <p className="text-destructive mb-4">{error}</p>}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4 w-full max-w-4xl">
        {results.map((result) => (
          <Card key={result.symbol} className="shadow-md hover:shadow-xl transition-all cursor-pointer" onClick={() => handleCardSelect(result)}>
            <CardHeader>
              <CardTitle className="text-xl">{result.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm"><span className="font-bold">Symbol:</span> {result.symbol}</p>
              <p className="text-sm"><span className="font-bold">Exchange:</span> {result.stockExchange}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {selectedStock && (
        <div className="mt-8 w-full max-w-4xl text-center">
          <p className="text-2xl font-bold text-[var(--secondary)] mb-6">
            Current Selection: {selectedStock.name} ({selectedStock.symbol}) - {selectedStock.stockExchange}
          </p>

          <div className="flex flex-col items-center">
            <label className="block text-lg mb-4">Select Date Range</label>
            <Calendar mode="range" selected={dateRange} onSelect={setDateRange} className="p-4 border border-border rounded-md text-[var(--secondary)]" />
          </div>

          {/* URL Dropdown */}
          <div className="mt-6 w-full flex justify-center">
            <div className="w-full max-w-xs">
                <Select onValueChange={setSelectedUrl}>
                <SelectTrigger className="bg-muted rounded-md p-3 border border-primary w-full text-[var(--secondary)]">
                    <SelectValue placeholder="Select Data Type" />
                </SelectTrigger>
                <SelectContent className="bg-muted border border-primary rounded-md p-2">
                    <SelectItem
                    value={`https://financialmodelingprep.com/api/v3/historical-chart/1min/AAPL?from=2018-03-12&to=2019-03-12&apikey=${process.env.NEXT_PUBLIC_API_KEY}`}
                    >
                    1 min data
                    </SelectItem>
                    <SelectItem
                    value={`https://financialmodelingprep.com/api/v3/historical-chart/5min/AAPL?from=2018-03-12&to=2019-03-12&apikey=${process.env.NEXT_PUBLIC_API_KEY}`}
                    >
                    5 min data
                    </SelectItem>
                    <SelectItem
                    value={`https://financialmodelingprep.com/api/v3/historical-chart/15min/AAPL?from=2018-03-12&to=2019-03-12&apikey=${process.env.NEXT_PUBLIC_API_KEY}`}
                    >
                    15 min data
                    </SelectItem>
                    <SelectItem
                    value={`https://financialmodelingprep.com/api/v3/historical-chart/30min/AAPL?from=2018-03-12&to=2019-03-12&apikey=${process.env.NEXT_PUBLIC_API_KEY}`}
                    >
                    30 min data
                    </SelectItem>
                    <SelectItem
                    value={`https://financialmodelingprep.com/api/v3/historical-chart/1hour/AAPL?from=2018-03-12&to=2019-03-12&apikey=${process.env.NEXT_PUBLIC_API_KEY}`}
                    >
                    1 hour data
                    </SelectItem>
                    <SelectItem
                    value={`https://financialmodelingprep.com/api/v3/historical-price-full/AAPL?from=2018-03-12&to=2019-03-12&apikey=${process.env.NEXT_PUBLIC_API_KEY}`}
                    >
                    EOD data
                    </SelectItem>
                </SelectContent>
                </Select>
            </div>
            </div>


          <Button className="mt-6 bg-primary text-primary-foreground" onClick={handleApiCall}>
            Go!
          </Button>

          {apiResponse && (
            <div className="flex flex-col items-center">
                <Button className="mt-6 bg-[var(--secondary)] text-background" onClick={handleDownloadCSV}>
                Download as CSV
                </Button>
                <pre className="p-4 mt-6 bg-muted rounded-md max-w-4xl overflow-auto text-sm">
                {JSON.stringify(apiResponse, null, 2)}
                </pre>
            </div>
            )}
        </div>
      )}
    </div>
  );
}
