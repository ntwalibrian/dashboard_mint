'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { StockItem } from "@/component.tsx/Stocks-item"
import { useState } from 'react'
import { StockDetails } from "@/component.tsx/stocks-detail"
import { rwandanStocks, StockData } from "@/data/Stock-data"

export default function StocksComponent() {
  const [selectedStock, setSelectedStock] = useState<StockData | null>(null)

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">
        Stocks
      </h1>
      <Card>
        <CardHeader>
          <CardTitle>Discover Stocks</CardTitle>
          <CardDescription>Companies trading on the Rwanda Stock Exchange (RSE)</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {rwandanStocks.map((stock) => (
              <StockItem
                key={stock.symbol}
                symbol={stock.symbol}
                name={stock.name}
                price={stock.price}
                change={stock.change}
                logo={stock.logo}
                onClick={() => setSelectedStock(stock)}
              />
            ))}
          </div>
        </CardContent>
      </Card>
      {selectedStock && (
        <StockDetails
          stock={selectedStock}
          isOpen={!!selectedStock}
          onClose={() => setSelectedStock(null)}
        />
      )}
    </div>
  )
}

