import { StockItem } from "./Stocks-item"
interface Stock {
  symbol: string
  name: string
  price: number
  change: number
  logo: string
}

interface StockListProps {
  title: string
  stocks: Stock[]
}

export function StockList({ title, stocks }: StockListProps) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <h2 className="text-lg font-semibold p-4 bg-gray-50">{title}</h2>
      <div className="divide-y divide-gray-200">
        {stocks.map((stock) => (
          <StockItem key={stock.symbol} symbol={stock.symbol} name={stock.name} price={stock.price} change={stock.change} logo={stock.logo} onClick={() => console.log(stock.symbol)} />
        ))}
      </div>
    </div>
  )
}

