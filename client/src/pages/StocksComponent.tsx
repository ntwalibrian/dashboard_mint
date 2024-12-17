'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { StockItem } from "@/component.tsx/Stocks-item"
import { useState } from 'react'
import { StockDetails } from "@/component.tsx/stocks-detail"
import { StockData } from "@/data/Stock-data"
import { useStockData } from "@/data/Stock-data"

interface StocksComponentProps { uid: '';}

export default function StocksComponent({uid} : StocksComponentProps) {
  const [selectedStock, setSelectedStock] = useState<StockData | null>(null)
  const {data,loading, error} = useStockData()

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
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
            {data.map((stock) => (
              <StockItem
                key={stock.symbol}
                symbol={stock.symbol}
                name={stock.company_name}
                price={stock.current_price}
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
          uid = {uid}
          stock={selectedStock}
          isOpen={!!selectedStock}
          onClose={() => setSelectedStock(null)}
        />
      )}
    </div>
  )
}

