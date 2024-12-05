import { ArrowUpIcon, ArrowDownIcon } from 'lucide-react'

import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"


interface StockItemProps {
  symbol: string
  name: string
  price: number
  change: number
  logo: string
  onClick: () => void
}

export function StockItem({ symbol, name, price, change, logo, onClick }: StockItemProps) {
  const isPositive = change >= 0

  return (
    <>
      <Button
        variant="ghost"
        className="w-full justify-start text-left p-4"
        onClick={onClick}
      >
        <div className="flex items-center space-x-4 w-full">
          <div className="flex-shrink-0">
            <img src={logo} alt={`${name} logo`} width={40} height={40} className="rounded-full" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate">{symbol}</p>
            <p className="text-sm text-muted-foreground truncate">{name}</p>
          </div>
          <div className="flex-shrink-0 text-right">
            <p className="text-sm font-medium">{price.toFixed(2)} RWF</p>
            <p className={`text-xs flex items-center justify-end ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
              {isPositive ? <ArrowUpIcon className="w-3 h-3 mr-1" /> : <ArrowDownIcon className="w-3 h-3 mr-1" />}
              {Math.abs(change).toFixed(2)}%
            </p>
          </div>
        </div>
      </Button>
      <Separator />
    </>
  )
}

