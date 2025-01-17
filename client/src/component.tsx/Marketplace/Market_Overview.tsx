import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  FiTrendingUp,
  FiDollarSign,
  FiClock,
  FiActivity,
} from "react-icons/fi";

interface MarketStats {
  activeListings: number;
  totalVolume: number;
  averagePrice: number;
  recentTrades: number;
}

//  Aha ndumva uzakora indi table you gufata total volume
const mockStats: MarketStats = {
  activeListings: 24,
  totalVolume: 15000000,
  averagePrice: 250000,
  recentTrades: 8,
};

export function MarketOverview() {
  return (
    <Card className="w-[400px]">
      <CardHeader>
        <CardTitle className="flex items-center">
          <FiActivity className="mr-2" />
          Market Overview
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <div className="flex items-center text-sm text-muted-foreground">
              <FiTrendingUp className="mr-1 h-4 w-4" />
              Active Listings
            </div>
            <p className="text-xl font-bold">{mockStats.activeListings}</p>
          </div>

          <div className="space-y-1">
            <div className="flex items-center text-sm text-muted-foreground">
              <FiDollarSign className="mr-1 h-4 w-4" />
              Total Volume
            </div>
            <p className="text-xl font-bold">
              {new Intl.NumberFormat("en-RW", {
                style: "currency",
                currency: "RWF",
                maximumFractionDigits: 0,
              }).format(mockStats.totalVolume)}
            </p>
          </div>

          <div className="space-y-1">
            <div className="flex items-center text-sm text-muted-foreground">
              <FiDollarSign className="mr-1 h-4 w-4" />
              Average Price
            </div>
            <p className="text-xl font-bold">
              {new Intl.NumberFormat("en-RW", {
                style: "currency",
                currency: "RWF",
                maximumFractionDigits: 0,
              }).format(mockStats.averagePrice)}
            </p>
          </div>

          <div className="space-y-1">
            <div className="flex items-center text-sm text-muted-foreground">
              <FiClock className="mr-1 h-4 w-4" />
              Recent Trades
            </div>
            <p className="text-xl font-bold">{mockStats.recentTrades}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
