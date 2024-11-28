import React, { useState } from 'react'
import { Card, Divider } from 'antd'


interface StockWatchlistItem {
 id: number;
 symbol: string;
 companyName: string;
 price: number;
 change: number;
}

const StockWatchlist: React.FC = () => {
 const [watchlist, setWatchlist] = useState<StockWatchlistItem[]>([
   { id: 1, symbol: "BOK", companyName: "BK Group", price: 150.25, change: 2.5 },
   { id: 2, symbol: "MTN", companyName: "MTN Rwanda ltd", price: 120.75, change: -1.2 },
 ])

 return (
   <Card 
     style={{ 
       width: 270, 
       height: 300, 
       background: 'white', 
       boxShadow: '0 4px 6px rgba(0,0,0,0.1)' 
     }}
   >
     <div className="text-lg font-bold mb-4">My Watchlist</div>
     <Divider style={{ margin: '5px 0' }} />
     {watchlist.map((stock) => (
       <div 
         key={stock.id} 
         className="flex justify-between items-center py-2"
       >
         <div className="flex items-center space-x-2">
        <div>
             <div className="font-semibold">{stock.symbol}</div>
             <div className="text-xs text-gray-500">{stock.companyName}</div>
           </div>
         </div>
         <div className="text-right">
           <div className="font-medium">${stock.price.toFixed(2)}</div>
           <div className={`text-sm ${stock.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
             {stock.change >= 0 ? '+' : ''}{stock.change.toFixed(2)}%
             
           </div>
        
         </div>
        
       </div>
     ))}
   </Card>
 )
}

export default StockWatchlist